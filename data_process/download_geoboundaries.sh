#!/usr/bin/env bash
# create folder
outputDir=data
outputDirGb=$outputDir/geoboundaries
outputDirTif=$outputDir/tif_boundaries

mkdir -p $outputDirGb
mkdir -p $outputDirTif

DOCKER_GDAL="docker run --rm -v ${pwd}:/mnt  ghcr.io/osgeo/gdal:alpine-small-latest"
countries=(VNM LAO MMR NPL AFG PAK )
#levels=(ADM0 ADM1 ADM2)
#for i in ${countries[*]};
#  do
#  for l in ${levels[*]};
#    do
#    echo "---- process ${i} ${l} ------"
#    wget -q  --show-progress "https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/gbOpen/${i}/${l}/geoBoundaries-${i}-${l}_simplified.geojson" \
#        -O ${outputDirGb}/${i}__${l}.geojson
#
#done
#done

# clip tiff
# for i in ${countries[*]};
#   do
#   gdalwarp -cutline ${outputDirGb}/${i}__ADM0.geojson -crop_to_cutline -dstalpha ${outputDir}/ppp_2020_1km_Aggregated.tif  $outputDirTif/${i}__ADM0.tif
# done
