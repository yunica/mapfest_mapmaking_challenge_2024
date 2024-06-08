import React, { useRef, useEffect, useState } from "react";
import StaticMap, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { COUNTRIES } from "../components/constants";
import Button from "../components/buttom";
import CustomSelect from "../components/select";
import DeckGL from "deck.gl";
import { MapContext } from "react-map-gl/dist/esm/components/map.js";
import { FiEye, FiEyeOff } from "react-icons/fi";

const API_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

  const handleChange = (selectCountry) => {
    setViewState({ ...initialViewState, ...selectCountry.center });
    setSelectedCountry(selectCountry);
  };

  const handleMapClick = (event) => {};
  const handleMapHover = (event) => {};

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
            boxZoom={true}
            doubleClickZoom={true}
            mapStyle="mapbox://styles/junica123/clx4w5d0p08dn01nx9vmbhyio"
            mapboxAccessToken={API_TOKEN}
          >
            <ScaleControl position="top-left" />
            <NavigationControl position="top-left" />
          </StaticMap>
        </DeckGL>
        {isSidebarVisible ? (
          <button
            className="absolute p-2 text-sm text-white bg-gray-200 rounded top-4 right-2 dark:bg-gray-700"
            onClick={() => setIsSidebarVisible(false)}
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
                  onClick={() => setIsSidebarVisible(true)}
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
