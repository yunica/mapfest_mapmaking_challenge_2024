import click
import geopandas as gpd
import numpy as np
import rasterio
from rasterio.transform import from_origin
from scipy.ndimage import gaussian_filter


@click.command(short_help="Create geo tiff")
@click.option("--geojson_path", help="Input geojson", type=str)
@click.option("--tif_output", help="Output tif file", type=str)
def run(geojson_path, tif_output):
    gdf = gpd.read_file(geojson_path)
    gdf.set_crs("EPSG:4326", inplace=True)
    gdf["geometry"] = gdf.geometry.centroid
    coords = np.array([(x, y) for x, y in zip(gdf.geometry.x, gdf.geometry.y)])

    cell_size = 0.00083333333
    x_min, y_min, x_max, y_max = gdf.total_bounds
    width = int((x_max - x_min) / cell_size)
    height = int((y_max - y_min) / cell_size)
    transform = from_origin(x_min, y_max, cell_size, cell_size)
    heatmap = np.zeros((height, width), dtype=np.float32)

    for x, y in coords:
        row = int((y_max - y) / cell_size)
        col = int((x - x_min) / cell_size)
        if 0 <= row < height and 0 <= col < width:
            heatmap[row, col] += 1

    heatmap = gaussian_filter(heatmap, sigma=1.1)

    with rasterio.open(
        tif_output,
        "w",
        driver="GTiff",
        height=heatmap.shape[0],
        width=heatmap.shape[1],
        count=1,
        dtype=heatmap.dtype,
        crs=gdf.crs,
        transform=transform,
        nodata=0,
        compress="LZW",
    ) as dst:
        dst.write(heatmap, 1)
        print(f"tif saved to {tif_output}")


if __name__ == "__main__":
    run()
