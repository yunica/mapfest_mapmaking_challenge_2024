#!/usr/bin/env bash
# create folder
outputDir=data
outputDirGb=$outputDir/geoboundaries

mkdir -p $outputDirGb

countries=(VNM LAO MMR NPL AFG PAK )
levels=(ADM0 ADM1 ADM2)
for i in ${countries[*]};
  do
  for l in ${levels[*]};
    do
    echo "---- process ${i} ${l} ------"
    wget -q  --show-progress "https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/gbOpen/${i}/${l}/geoBoundaries-${i}-${l}_simplified.geojson" \
        -O ${outputDirGb}/${i}__${l}.geojson

done
done
