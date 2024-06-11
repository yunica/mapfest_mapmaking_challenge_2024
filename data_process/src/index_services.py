import click
import geopandas as gpd
import numpy as np
import rasterio as rio
from rasterio.transform import from_origin
from scipy.fft._pocketfft import dst
from scipy.ndimage import gaussian_filter
from rasterio.enums import Resampling
import scipy.interpolate


def fix_size_rasters(all_rasters, nodata_value=0):
    # found min, max
    minx, miny, maxx, maxy = None, None, None, None
    for raster in all_rasters:
        bounds = raster.bounds
        if minx is None or bounds.left < minx:
            minx = bounds.left
        if miny is None or bounds.bottom < miny:
            miny = bounds.bottom
        if maxx is None or bounds.right > maxx:
            maxx = bounds.right
        if maxy is None or bounds.top > maxy:
            maxy = bounds.top

    profile = all_rasters[0].profile

    profile.update(
        width=int((maxx - minx) / all_rasters[0].res[0]),
        height=int((maxy - miny) / all_rasters[0].res[1]),
        transform=rio.transform.from_bounds(
            minx,
            miny,
            maxx,
            maxy,
            int((maxx - minx) / all_rasters[0].res[0]),
            int((maxy - miny) / all_rasters[0].res[1]),
        ),
    )

    aligned_rasters = []
    # complete
    for raster in all_rasters:
        # matrix nodata
        data = np.zeros(
            (profile["height"], profile["width"]),
            dtype=raster.meta["dtype"],
        )

        window = rio.windows.from_bounds(minx, miny, maxx, maxy, raster.transform)

        window = rio.windows.Window(
            col_off=int(window.col_off),
            row_off=int(window.row_off),
            width=int(window.width),
            height=int(window.height),
        )

        original_data = raster.read(
            1,
            window=window,
            boundless=True,
            fill_value=nodata_value,
            out_shape=(int(window.height), int(window.width)),
        )

        row_off = int((raster.bounds.top - maxy) / raster.res[1])
        col_off = int((minx - raster.bounds.left) / raster.res[0])

        row_off = max(row_off, 0)
        col_off = max(col_off, 0)

        final_height = min(int(window.height), profile["height"] - row_off)
        final_width = min(int(window.width), profile["width"] - col_off)

        data[
            row_off : row_off + final_height, col_off : col_off + final_width
        ] = original_data[:final_height, :final_width]

        data_array = np.array(data)
        aligned_rasters.append(data_array)
    return aligned_rasters, profile


@click.command(short_help="Create index")
@click.option("--population_path", help="Input tif file", type=str)
@click.option("--education_path", help="Input tif file", type=str)
@click.option("--healthcare_path", help="Input tif file", type=str)
@click.option("--transport_path", help="Input tif file", type=str)
@click.option("--tif_output", help="Output tif file", type=str)
def run(population_path, education_path, healthcare_path, transport_path, tif_output):
    raster_popu = rio.open(population_path)
    #
    raster_educ = rio.open(education_path)
    raster_heal = rio.open(healthcare_path)
    raster_trans = rio.open(transport_path)

    nodata_value = 0

    raster_osm_data = [raster_educ, raster_heal, raster_trans, raster_popu]
    aligned_rasters, custom_profile = fix_size_rasters(raster_osm_data, nodata_value)
    custom_profile.update(nodata=nodata_value)
    aligned_rasters_osm = aligned_rasters[:-1]
    # osm rasters
    raster_osm_pond = [
        r_matrix * factor
        for r_matrix, factor in zip(aligned_rasters_osm, [6, 12, 1])
    ]
    result_osm = np.sum(raster_osm_pond, axis=0)
    # interpolation
    mask_zeros = (result_osm == 0)
    epsilon = 1e-6
    result_osm_log = np.log(result_osm + epsilon)
    result_osm_log_normalized = (result_osm_log - result_osm_log.min()) / (result_osm_log.max() - result_osm_log.min())
    result_osm_log_normalized[mask_zeros] = 0
    # population
    pop_matrix = aligned_rasters[-1]
    pop_matrix = np.where(pop_matrix > 500, 500, pop_matrix)
    result_pop = np.where(pop_matrix > 0, 1 - (pop_matrix / 500), 0)
    # result
    result = result_pop - result_osm_log_normalized
    result = np.where(result > nodata_value, result, nodata_value)

    with rio.open(tif_output, "w", **custom_profile) as dst:
        dst.write(result, 1)


if __name__ == "__main__":
    run()
