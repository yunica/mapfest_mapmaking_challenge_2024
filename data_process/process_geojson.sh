#!/usr/bin/env bash
# create folder
outputDir=csv_file
export AWS_PROFILE=personal

mkdir -p $outputDir

countries=("vietnam:VNM"
            "laos:LAO"
            "myanmar:MMR"
            "nepal:NPL"
            "afghanistan:AFG"
            "pakistan:PAK"
              )

for i in "${countries[@]}" ;
 do
   KEY="${i%%:*}"
   VALUE="${i##*:}"

   python src/clean_data.py \
      --geojson_inp=data/osm/geojson/${KEY}_poi_education.geojson \
      --geojson_geometry=data/geoboundaries/${VALUE}__ADM0.geojson \
      --csv_out=${outputDir}/${KEY}_education.csv.gz

    python src/clean_data.py \
        --geojson_inp=data/osm/geojson/${KEY}_healthcare.geojson \
        --geojson_geometry=data/geoboundaries/${VALUE}__ADM0.geojson \
        --csv_out=${outputDir}/${KEY}_healthcare.csv.gz

    python src/clean_data.py \
        --geojson_inp=data/osm/geojson/${KEY}_transport.geojson \
        --geojson_geometry=data/geoboundaries/${VALUE}__ADM0.geojson \
        --csv_out=${outputDir}/${KEY}_transport.csv.gz

#    # prepare cog
#    rio cogeo create data/tif_boundaries/${VALUE}.tif \
#        data/tif_boundaries/${VALUE}_cog.tif \
#        --blocksize 512 \
#        --co JPEG_QUALITY=100 \
#        --nodata -99999 \
#        -w

    python src/points2raster.py \
          --geojson_path=data/osm/geojson/${KEY}_poi_education.geojson \
          --boundary_path=data/geoboundaries/${VALUE}__ADM0.geojson \
          --tif_output=data/tif_boundaries/${VALUE}_education.tif

    python src/points2raster.py \
        --geojson_path=data/osm/geojson/${KEY}_healthcare.geojson \
        --boundary_path=data/geoboundaries/${VALUE}__ADM0.geojson \
        --tif_output=data/tif_boundaries/${VALUE}_healthcare.tif

    python src/points2raster.py \
      --geojson_path=data/osm/geojson/${KEY}_transport.geojson \
      --boundary_path=data/geoboundaries/${VALUE}__ADM0.geojson \
      --tif_output=data/tif_boundaries/${VALUE}_transport.tif


      python src/index_services.py \
        --population_path=data/tif_boundaries/${VALUE}.tif \
        --education_path=data/tif_boundaries/${VALUE}_education.tif \
        --healthcare_path=data/tif_boundaries/${VALUE}_healthcare.tif \
        --transport_path=data/tif_boundaries/${VALUE}_transport.tif \
        --tif_output=data/tif_boundaries/${VALUE}_index_services.tif

     rio cogeo create  data/tif_boundaries/${VALUE}_index_services.tif \
        data/tif_boundaries/${VALUE}_index_services_cog.tif \
        --blocksize 512 \
        --co JPEG_QUALITY=100 \
        --nodata 0  -w

  echo "---- done  ${i} ------"
done
## mv
cp -r $outputDir ../app/public/assets/

