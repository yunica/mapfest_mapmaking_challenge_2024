import React, { useRef, useEffect, useState } from "react";
import StaticMap, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import {
  COUNTRIES,
  MIN_ZOOM_LAYOUT,
  MAX_ZOOM_LAYOUT_DATA,
  MIN_ZOOM_LAYOUT_DATA,
  AMENITIES,
} from "../components/constants";
import { layoutStyleGeneral } from "../utils/mapStyle";
import DeckGL from "deck.gl";
import { MapContext } from "react-map-gl/dist/esm/components/map.js";
import { fetchLocalCsv } from "../utils/utils";
import Sidebar from "../components/Sidebar";

const basename = (process.env.PUBLIC_URL || "").replace("//", "/");
const API_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const LAYERS_ACTION = ["school-layer", "antenas-layer"];
const initialViewState = {
  latitude: 14.0583,
  longitude: 108.2772,
  zoom: 8,
};

function App() {
  const mapRef = useRef(null);
  const deckRef = useRef(null);
  const [deckLayers, setDeckLayers] = useState([]);
  const [viewState, setViewState] = useState({ ...initialViewState });
  const [sourcesData, setSourcesData] = useState(null);
  const [sourcesDataFlag, setSourcesDataFlag] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  // fetch data
  useEffect(() => {
    const fetchData = async ({ name_code }) => {
      try {
        const educationData = await fetchLocalCsv(name_code, "education");
        const healthcareData = await fetchLocalCsv(name_code, "healthcare");
        const transportData = await fetchLocalCsv(name_code, "transport");

        setSourcesData({
          educationData,
          healthcareData,
          transportData,
        });
        setSourcesDataFlag({
          education_layer: false,
          healthcare_layer: false,
          transport_layer: false,
        });
      } catch (err) {
        setSourcesData(null);
        setSourcesDataFlag(null);
      }
    };

    const { name_code } = selectedCountry;
    fetchData({ name_code });
  }, [selectedCountry]);

  const handleChange = (selectCountry) => {
    setViewState({ ...initialViewState, ...selectCountry.center });
    setSelectedCountry(selectCountry);
  };

  const handlesetSourcesDataFlag = (layer_id) => (event) => {
    setSourcesDataFlag({
      ...sourcesDataFlag,
      [layer_id]: event.target.checked,
    });
  };
  const handleMapClick = (event) => {};
  const handleMapHover = (event) => {};
  const handleLoad = () => {
    const map = mapRef.current.getMap();
    // load images
    const icons = Object.keys(AMENITIES);
    icons
      .filter((j) => j)
      .forEach((i) => {
        fetch(`${basename}/assets/marker/${AMENITIES[i]}`)
          .then((response) => response.blob())
          .then((blob) => {
            try {
              const reader = new FileReader();
              reader.onload = () => {
                const image = new Image(64, 64);
                image.src = reader.result;
                image.onload = () => {
                  map.addImage(`${i}-icon`, image);
                };
              };
              reader.readAsDataURL(blob);
            } catch (error) {
              console.error(error);
            }
          });
      });
  };

  return (
    <div className="relative w-full h-screen bg-white dark:bg-slate-800">
      <div className="w-screen h-screen">
        <DeckGL
          ref={deckRef}
          layers={deckLayers}
          initialViewState={viewState}
          controller={true}
          ContextProvider={MapContext.Provider}
          onClick={handleMapClick}
          onHover={handleMapHover}
        >
          <StaticMap
            ref={mapRef}
            scrollZoom={true}
            onLoad={handleLoad}
            boxZoom={true}
            minZoom={6}
            maxZoom={15}
            doubleClickZoom={true}
            mapStyle="mapbox://styles/junica123/clx4w5d0p08dn01nx9vmbhyio"
            mapboxAccessToken={API_TOKEN}
          >
            {sourcesDataFlag && sourcesData && sourcesData.educationData ? (
              <Source
                id="education-osm"
                type="geojson"
                data={sourcesData.educationData}
              >
                <Layer
                  id="education-points"
                  type="symbol"
                  filter={
                    sourcesDataFlag.education_layer ? null : ["==", "id", -1]
                  }
                  layout={layoutStyleGeneral}
                  maxzoom={MAX_ZOOM_LAYOUT_DATA}
                  minzoom={MIN_ZOOM_LAYOUT_DATA}
                />
              </Source>
            ) : null}
            {sourcesDataFlag && sourcesData && sourcesData.healthcareData ? (
              <Source
                id="healthcare-osm"
                type="geojson"
                data={sourcesData.healthcareData}
              >
                <Layer
                  id="healthcare-points"
                  type="symbol"
                  filter={
                    sourcesDataFlag.healthcare_layer ? null : ["==", "id", -1]
                  }
                  layout={layoutStyleGeneral}
                  maxzoom={MAX_ZOOM_LAYOUT_DATA}
                  minzoom={MIN_ZOOM_LAYOUT_DATA}
                />
              </Source>
            ) : null}
            {sourcesDataFlag && sourcesData && sourcesData.transportData ? (
              <Source
                id="trasport-osm"
                type="geojson"
                data={sourcesData.transportData}
              >
                <Layer
                  id="trasport-points"
                  type="symbol"
                  filter={
                    sourcesDataFlag.transport_layer ? null : ["==", "id", -1]
                  }
                  layout={layoutStyleGeneral}
                  maxzoom={MAX_ZOOM_LAYOUT_DATA}
                  minzoom={MIN_ZOOM_LAYOUT_DATA}
                />
              </Source>
            ) : null}

            <ScaleControl position="top-left" />
            <NavigationControl position="top-left" />
          </StaticMap>
        </DeckGL>

        <Sidebar
          handleChangeSelect={handleChange}
          selectedCountry={selectedCountry}
          layersCheckbox={sourcesDataFlag}
          setCheckboxLayer={handlesetSourcesDataFlag}
        />
      </div>
    </div>
  );
}

export default App;
