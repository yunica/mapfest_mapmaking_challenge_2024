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
countries=(vietnam laos myanmar nepal afghanistan pakistan )
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
         --keep="boundary=administrative or admin_level=* or amenity=*" \
         > ${outputDirOsm}/${i}_filter.osm

  [[ ! -f ${outputDirOsm}/${i}_boundary.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="boundary=administrative and (admin_level=2 or admin_level=4 or admin_level=6)" \
         > ${outputDirOsm}/${i}_boundary.osm

  [[ ! -f ${outputDirOsm}/${i}_poi_education.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="amenity=school =kindergarten =college =university =library =public_bookcase" \
         > ${outputDirOsm}/${i}_poi_education.osm

  [[ ! -f ${outputDirOsm}/${i}_healthcare.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep="amenity=hospital =clinic =doctors =dentist =pharmacy =nursing_home =social_facility" \
         > ${outputDirOsm}/${i}_healthcare.osm

 [[ ! -f ${outputDirOsm}/${i}_transport.osm ]] && \
    $GEOKIT_NODE osmfilter ${outputDirOsm}/${i}_filter.osm \
         --keep"amenity=bus_station =ferry_terminal =fuel =parking =taxi =car_rental =bicycle_rental =bicycle_parking =car_wash =charging_station =ferry_terminal =bicycle_repair_station =public_transport" \
         > ${outputDirOsm}/${i}_transport.osm
  #  osm 2 geojson

  docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_boundary.osm >  ${outputDirGeoJson}/${i}_boundary.geojson

  docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_poi_education.osm >  ${outputDirGeoJson}/${i}_poi_education.geojson

 docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_healthcare.osm >  ${outputDirGeoJson}/${i}_healthcare.geojson

 docker run --rm -v ${PWD}:/mnt/data developmentseed/geokit:node.latest node --max-old-space-size=14336 /usr/bin/osmtogeojson \
    ${outputDirOsm}/${i}_transport.osm >  ${outputDirGeoJson}/${i}_transport.geojson


  echo "---- done osm process ${i} ------"
done
