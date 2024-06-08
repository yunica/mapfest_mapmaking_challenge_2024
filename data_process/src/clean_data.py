import click
import csv
import json
import geopandas as gpd
import gzip


@click.command(short_help="Clean osm data")
@click.option("--geojson_inp", help="Input geojso file", type=str)
@click.option("--geojson_geometry", help="Input geojso geometry file", type=str)
@click.option("--csv_out", help="Output geojso file", type=str)
def run(geojson_inp, geojson_geometry, csv_out):
    gdf = gpd.read_file(geojson_inp)
    gdf_geometry = gpd.read_file(geojson_geometry)
    gdf.set_crs(epsg=4326, inplace=True)
    gdf_geometry.set_crs(epsg=4326, inplace=True)

    gdf["geometry"] = gdf.geometry.centroid
    gdf["longitude"] = gdf.geometry.x
    gdf["latitude"] = gdf.geometry.y
    gdf_filter = gdf.sjoin(gdf_geometry, how="inner")
    gdf_filter_ = gdf_filter[["id", "name", "amenity", "latitude", "longitude"]]
    gdf_filter_.dropna(subset=['amenity'], inplace=True)
    with gzip.open(csv_out, 'wt', encoding='utf-8') as f:
        gdf_filter_.to_csv(f, index=False)
    # show all amenity


if __name__ == "__main__":
    run()
