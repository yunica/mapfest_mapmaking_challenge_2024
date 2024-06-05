#!/usr/bin/env bash
# create folder
outputDir=data
outputDirOsm=$outputDir/osm

mkdir -p $outputDirOsm

GEOKIT_NODE="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.develop"
GEOKIT_JAVA="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:java.develop"
GEOKIT_PYTHON="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:java.develop"
#
countries=(india bangladesh pakistan nepal )
for i in ${countries[*]};
 do
  # fecha osm data
  curl https://download.geofabrik.de/asia/${i}-latest.osm.pbf --output ${outputDirOsm}/${i}.osm.pbf
  # pbf to osm
  $GEOKIT_JAVA osmosis --read-pbf file=${outputDirOsm}/${i}.osm.pbf --write-xml ${outputDirOsm}/${i}.osm
  # osm filter
  $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}.osm \
                 --keep="boundary=administrative or building=* or amenity=*	or highway=*" \
                 > ${outputDirOsm}/${i}_filter.osm

  $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
                 --keep="boundary=administrative" \
                 > ${outputDirOsm}/${i}_boundary.osm

  $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
                 --keep="building=* or amenity=*" \
                 > ${outputDirOsm}/${i}_poi.osm

  $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
                 --keep="highway=*" \
                 > ${outputDirOsm}/${i}_highway.osm

  echo "---- done osm process ${i} ------"
done
