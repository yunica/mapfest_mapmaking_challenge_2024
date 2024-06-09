import React from "react";
import { Source, Layer } from "react-map-gl";
import { layoutStyleGeneral, paintHeatmap } from "../utils/mapStyle";

import {
  MIN_ZOOM_HEADMAP,
  MAX_ZOOM_HEADMAP,
  MAX_ZOOM_LAYOUT_DATA,
  MIN_ZOOM_LAYOUT_DATA,
} from "../components/constants";

const DataLayer = ({ id, data, layerFlag, layout, maxzoom, minzoom }) => (
  <Source id={`${id}-osm`} type="geojson" data={data}>
    <Layer
      id={`${id}-points`}
      type="symbol"
      filter={layerFlag ? null : ["==", "id", -1]}
      layout={layout}
      maxzoom={maxzoom.layout}
      minzoom={minzoom.layout}
    />
    <Layer
      id={`${id}-heatmap`}
      type="heatmap"
      filter={layerFlag ? null : ["==", "id", -1]}
      maxzoom={maxzoom.heatmap}
      minzoom={minzoom.heatmap}
      paint={paintHeatmap(id)}
    />
  </Source>
);

const DataLayerWrap = ({ sourcesDataFlag, sourcesData }) => (
  <>
    {sourcesDataFlag && sourcesData && sourcesData.educationData && (
      <DataLayer
        id="education"
        data={sourcesData.educationData}
        layerFlag={sourcesDataFlag.education_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
    {sourcesDataFlag && sourcesData && sourcesData.healthcareData && (
      <DataLayer
        id="healthcare"
        data={sourcesData.healthcareData}
        layerFlag={sourcesDataFlag.healthcare_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
    {sourcesDataFlag && sourcesData && sourcesData.transportData && (
      <DataLayer
        id="transport"
        data={sourcesData.transportData}
        layerFlag={sourcesDataFlag.transport_layer}
        layout={layoutStyleGeneral}
        maxzoom={{ layout: MAX_ZOOM_LAYOUT_DATA, heatmap: MAX_ZOOM_HEADMAP }}
        minzoom={{ layout: MIN_ZOOM_LAYOUT_DATA, heatmap: MIN_ZOOM_HEADMAP }}
      />
    )}
  </>
);

export default DataLayerWrap;
