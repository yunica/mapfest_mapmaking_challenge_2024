import click
import csv
import json
import geopandas as gpd


@click.command(short_help="Clean osm data")
@click.option("--geojson_inp", help="Input geojso file", type=str)
@click.option("--csv_out", help="Output geojso file", type=str)
def run(geojson_inp, csv_out):
    gdf = gpd.read_file(geojson_inp)
    gdf.set_crs(epsg=4326, inplace=True)
    gdf["geometry"] = gdf.geometry.centroid
    gdf["longitude"] = gdf.geometry.x
    gdf["latitude"] = gdf.geometry.y
    gdf_ = gdf[["id", "name", "amenity", "latitude", "longitude"]]
    gdf_.to_csv(csv_out, index=False, compression='gzip')


if __name__ == "__main__":
    run()
