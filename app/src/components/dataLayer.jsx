import React from 'react';
import { Source, Layer } from 'react-map-gl';
import { layoutStyleGeneral, paintHeatmap, alphaRaster, alphaRasterIndex } from '../utils/mapStyle';

import {
  MIN_ZOOM_HEADMAP,
  MAX_ZOOM_HEADMAP,
  MAX_ZOOM_LAYOUT_DATA,
  MIN_ZOOM_LAYOUT_DATA
} from '../components/constants';

const TITLER_URL = process.env.REACT_APP_TITLER_URL || '';
const S3_PATH = process.env.REACT_APP_S3_PATH || '';

const DataLayer = ({ id, data, layerFlag, layout, maxzoom, minzoom }) => (
  <Source id={`${id}-osm`} type="geojson" data={data}>
    <Layer
      id={`${id}-points`}
      type="symbol"
      filter={layerFlag ? null : ['==', 'id', -1]}
      layout={layout}
      maxzoom={maxzoom.layout}
      minzoom={minzoom.layout}
    />
    <Layer
      id={`${id}-heatmap`}
      type="heatmap"
      filter={layerFlag ? null : ['==', 'id', -1]}
      maxzoom={maxzoom.heatmap}
      minzoom={minzoom.heatmap}
      paint={paintHeatmap(id)}
    />
  </Source>
);

const DataLayerWrap = ({ sourcesDataFlag, sourcesData, countryData }) => (
  <>
    {sourcesDataFlag && sourcesData && sourcesData.educationData && (
      <DataLayer
        id="education"
        data={sourcesData.educationData}
        layerFlag={sourcesDataFlag.education_osm_data_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
    {sourcesDataFlag && sourcesData && sourcesData.healthcareData && (
      <DataLayer
        id="healthcare"
        data={sourcesData.healthcareData}
        layerFlag={sourcesDataFlag.healthcare_osm_data_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
    {sourcesDataFlag && sourcesData && sourcesData.transportData && (
      <DataLayer
        id="transport"
        data={sourcesData.transportData}
        layerFlag={sourcesDataFlag.transport_osm_data_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
    {sourcesDataFlag && (
      <Source
        id={`index_services`}
        type="raster"
        tiles={[
          `${TITLER_URL}/{z}/{x}/{y}@1x?url=${S3_PATH}/${countryData.iso_code}_index_services_cog.tif&rescale=0,1&colormap_name=rdbu_r`
        ]}
        tileSize={256}
      >
        <Layer
          id="index-tif"
          type="raster"
          layout={{
            visibility: sourcesDataFlag.services_inaccessibility_index_layer ? 'visible' : 'none'
          }}
          paint={alphaRasterIndex}
        />
      </Source>
    )}
    {sourcesDataFlag && (
      <Source
        id={`raster-osm`}
        type="raster"
        tiles={[
          `${TITLER_URL}/{z}/{x}/{y}@1x?url=${S3_PATH}/${countryData.iso_code}_cog.tif&rescale=${countryData.rescale}&colormap_name=inferno`
        ]}
        tileSize={256}
      >
        <Layer
          id="pop-tif"
          type="raster"
          layout={{
            visibility: sourcesDataFlag.population_density_layer ? 'visible' : 'none'
          }}
          paint={alphaRaster}
        />
      </Source>
    )}
    {sourcesDataFlag && sourcesData && sourcesData.adminBoundary && (
      <Source id={`boundary-adm0`} type="geojson" data={sourcesData.adminBoundary}>
        <Layer
          id={`boundary-adm0-points`}
          type="line"
          paint={{
            'line-color': 'red',
            'line-width': 1,
            'line-opacity': 0.7
          }}
          maxzoom={18}
          minzoom={MIN_ZOOM_HEADMAP}
        />
      </Source>
    )}
  </>
);

export default DataLayerWrap;
