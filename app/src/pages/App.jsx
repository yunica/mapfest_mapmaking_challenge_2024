import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
import { COUNTRIES } from "../components/constants";
import Button from "../components/buttom";

const API_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div className="relative bg-white dark:bg-slate-800 w-full h-screen">
      <div className={`h-screen w-screen`}>
        <Map
          mapboxAccessToken={API_TOKEN}
          initialViewState={{
            latitude: 11.0942,
            longitude: 106.601,
            zoom: 9,
          }}
          mapStyle="mapbox://styles/junica123/clx4w5d0p08dn01nx9vmbhyio"
        />
        <button
          className="absolute top-3 right-4 px-2 bg-gray-200 dark:bg-gray-700 text-white rounded text-sm"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          {isSidebarVisible ? "Hice options" : "Show options"}
        </button>

        {isSidebarVisible && (
          <div className="absolute top-12 right-2 bottom-2 w-1/4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg	">
            <h1 className="text-xl text-white text-center font-bold mb-4">Countries</h1>
            {COUNTRIES.map((i) =>  <Button key={i.name} ico={i.ico} name={i.name} /> )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
