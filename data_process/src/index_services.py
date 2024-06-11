import click
import geopandas as gpd
import numpy as np
import rasterio as rio
from rasterio.transform import from_origin
from scipy.fft._pocketfft import dst
from scipy.ndimage import gaussian_filter
from rasterio.enums import Resampling


@click.command(short_help="Create index")
@click.option("--population_path", help="Input tif file", type=str)
@click.option("--education_path", help="Input tif file", type=str)
@click.option("--healthcare_path", help="Input tif file", type=str)
@click.option("--transport_path", help="Input tif file", type=str)
@click.option("--tif_output", help="Output tif file", type=str)
def run(population_path, education_path, healthcare_path, transport_path, tif_output):
    # with rasterio.open(tif_input) as src:
    #     tif_data = src.read(1)
    #     profile = src.profile
    # nodata_value = -99999
    # max_value = tif_data.max()
    # filtered_data = np.where(tif_data > 0, tif_data / max_value, nodata_value)
    #
    # profile.update(dtype=rasterio.float32, count=1, nodata=nodata_value)
    # with rasterio.open(tif_output, "w", **profile) as dst:
    #     dst.write(filtered_data.astype(rasterio.float32), 1)
    raster_popu = rio.open(population_path)
    raster_educ = rio.open(education_path)
    raster_heal = rio.open(healthcare_path)
    raster_trans = rio.open(transport_path)

    all_rasters = [raster_educ, raster_heal, raster_trans]
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
    nodata_value = profile.get("nodata", -9999)
    # complete
    for raster, source in zip(all_rasters, ["education", "healthcare", "transport"]):
        # matrix nodata
        data = np.full(
            (profile["height"], profile["width"]),
            nodata_value,
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

        factor = 1
        if source == "healthcare":
            factor = 20
        elif source == "education":
            factor = 10

        aligned_rasters.append(data_array * factor)

    result = np.sum(aligned_rasters, axis=0)
    result = np.where(result > 0, result, nodata_value)

    result[np.isnan(result)] = nodata_value
    profile.update(nodata=nodata_value)
    with rio.open(tif_output, "w", **profile) as dst:
        dst.write(result, 1)


if __name__ == "__main__":
    run()
