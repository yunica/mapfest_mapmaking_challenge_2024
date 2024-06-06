#!/usr/bin/env bash
# create folder
outputDir=data
outputDirOsm=$outputDir/osm
outputDirGeoJson=$outputDirOsm/geojson

mkdir -p $outputDirGeoJson

GEOKIT_NODE="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.develop"
GEOKIT_JAVA="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:java.develop"
GEOKIT_PYTHON="docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:java.develop"
#
countries=(india bangladesh pakistan nepal )
for i in ${countries[*]};
 do
  # fecha osm data
  [[ ! -f ${outputDirOsm}/${i}.osm.pbf ]] && \
      curl https://download.geofabrik.de/asia/${i}-latest.osm.pbf --output ${outputDirOsm}/${i}.osm.pbf
  # pbf to osm

  [[ ! -f ${outputDirOsm}/${i}.osm ]] && \
      $GEOKIT_JAVA osmosis --read-pbf file=${outputDirOsm}/${i}.osm.pbf --write-xml ${outputDirOsm}/${i}.osm

  # osm filter

  [[ ! -f ${outputDirOsm}/${i}_filter.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}.osm \
         --keep="boundary=administrative or building=* or amenity=*	or highway=*" \
         > ${outputDirOsm}/${i}_filter.osm

  [[ ! -f ${outputDirOsm}/${i}_boundary.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="boundary=administrative or admin_level=4 or admin_level=2 or admin_level=6" \
         > ${outputDirOsm}/${i}_boundary.osm

  [[ ! -f ${outputDirOsm}/${i}_poi.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="building=* or amenity=*" \
         > ${outputDirOsm}/${i}_poi.osm

  [[ ! -f ${outputDirOsm}/${i}_highway.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="highway=*" \
         > ${outputDirOsm}/${i}_highway.osm
  #  osm 2 geojson

  [[ ! -f ${outputDirGeoJson}/${i}_boundary.geojson ]] && \
    docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_boundary.osm >  ${outputDirGeoJson}/${i}_boundary.geojson

  [[ ! -f ${outputDirGeoJson}/${i}_poi.geojson ]] && \
    docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_poi.osm >  ${outputDirGeoJson}/${i}_poi.geojson

  [[ ! -f ${outputDirGeoJson}/${i}_highway.geojson ]] && \
    docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_highway.osm >  ${outputDirGeoJson}/${i}_highway.geojson

  echo "---- done osm process ${i} ------"
done
