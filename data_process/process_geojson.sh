#!/usr/bin/env bash
# create folder
outputDir=csv_file

mkdir -p $outputDir

countries=(vietnam laos myanmar nepal afghanistan pakistan )
for i in ${countries[*]};
 do
   python src/clean_data.py \
      --geojson_inp=data/osm/geojson/${i}_poi_education.geojson \
      --csv_out=${outputDir}/${i}_education.csv.gz

    python src/clean_data.py \
        --geojson_inp=data/osm/geojson/${i}_healthcare.geojson \
        --csv_out=${outputDir}/${i}_healthcare.csv.gz

    python src/clean_data.py \
        --geojson_inp=data/osm/geojson/${i}_transport.geojson \
        --csv_out=${outputDir}/${i}_transport.csv.gz

  echo "---- done  ${i} ------"
done
