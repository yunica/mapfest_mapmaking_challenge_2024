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
  AMENITIES,
  layoutStyleGeneral,
} from "../components/constants";
import CustomSelect from "../components/select";
import DeckGL from "deck.gl";
import { MapContext } from "react-map-gl/dist/esm/components/map.js";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import pako from "pako";
import { csv2object, object2feature } from "../utils/utils";

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
  // layout
  const [sourceSchool, setSourceSchool] = useState(null);

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const handleChange = (selectCountry) => {
    setViewState({ ...initialViewState, ...selectCountry.center });
    setSelectedCountry(selectCountry);
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
  // fetch data
  useEffect(() => {
    const fetchData = async ({ name_code }) => {
      try {
        const responseSchool = await axios.get(
          `${basename}/assets/csv_file/${name_code}_education.csv.gz`,
          {
            responseType: "arraybuffer",
          }
        );
        const responseSchoolString = pako.inflate(responseSchool.data, {
          to: "string",
        });
        let schoolObject = object2feature(csv2object(responseSchoolString));
        setSourceSchool(schoolObject);
      } catch (err) {
        console.error(err);
      }
    };

    const { name, name_code, iso_code } = selectedCountry;

    fetchData({ name, name_code, iso_code });
  }, [selectedCountry]);

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
            {sourceSchool ? (
              <Source id="school-points" type="geojson" data={sourceSchool}>
                <Layer
                  id="school-layer"
                  type="symbol"
                  layout={layoutStyleGeneral}
                  maxzoom={16}
                  minzoom={MIN_ZOOM_LAYOUT}
                />
              </Source>
            ) : null}

            <ScaleControl position="top-left" />
            <NavigationControl position="top-left" />
          </StaticMap>
        </DeckGL>
        {!isSidebarVisible ? (
          <button
            className="absolute p-2 text-sm text-white bg-gray-200 rounded top-4 right-2 dark:bg-gray-700"
            onClick={() => setIsSidebarVisible(true)}
          >
            <div className="flex items-center justify-start ">
              <FiEye />
              <label className="ml-2">Show panel</label>
            </div>
          </button>
        ) : (
          <div className="absolute w-1/4 p-2 bg-gray-200 rounded-lg top-4 right-2 bottom-8 dark:bg-gray-700 ">
            <h1 className="mb-4 text-xl text-center text-white font-">
              Countries
              <label className="text-right">
                <button
                  className="absolute px-2 text-sm text-white bg-gray-200 rounded top-4 right-2 dark:bg-gray-700 "
                  onClick={() => setIsSidebarVisible(false)}
                  data-tooltip-target="tooltip-hidde"
                  type="button"
                >
                  <FiEyeOff />
                </button>
              </label>
            </h1>
            <CustomSelect
              options={COUNTRIES}
              onChange={handleChange}
              selectedValue={selectedCountry}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
