import React, { useRef, useEffect, useState } from "react";
import StaticMap, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { COUNTRIES } from "../components/constants";
import Button from "../components/buttom";
import DeckGL from "deck.gl";
import { MapContext } from "react-map-gl/dist/esm/components/map.js";

const API_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const initialViewState = {
  latitude: 14.0583,
  longitude: 108.2772,
  zoom: 7,
};

function App() {
  const mapRef = useRef(null);
  const deckRef = useRef(null);
  const [deckLayers, setDeckLayers] = useState([]);
  const [viewState, setViewState] = useState({ ...initialViewState });

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const onClickCountry = (item) => {
    setViewState({...initialViewState,...item.center})
  };
  const handleMapClick = (event) => {
  };
  const handleMapHover = (event) => {
  
  };

  return (
    <div className="relative bg-white dark:bg-slate-800 w-full h-screen">
      <div className="h-screen w-screen">
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

        <button
          className="absolute top-3 right-4 px-2 bg-gray-200 dark:bg-gray-700 text-white rounded text-sm"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          {isSidebarVisible ? "Hice options" : "Show options"}
        </button>

        {isSidebarVisible && (
          <div className="absolute top-12 right-2 bottom-2 w-1/4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg	">
            <h1 className="text-xl text-white text-center font-bold mb-4">
              Countries
            </h1>
            {COUNTRIES.map((i) => (
              <Button
                key={i.name}
                ico={i.ico}
                name={i.name}
                onClick={() => onClickCountry(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
