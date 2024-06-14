import React, { useRef, useEffect, useState } from 'react';
import StaticMap, { NavigationControl, ScaleControl } from 'react-map-gl';
import { COUNTRIES, AMENITIES } from '../components/constants';
import { fetchLocalCsv, fetchLocalGeojson } from '../utils/utils';
import Sidebar from '../components/Sidebar';
import CustomPopUp from '../components/popUp';
import DataLayerWrap from '../components/dataLayer';

const basename = (process.env.PUBLIC_URL || '').replace('//', '/');
const API_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const LAYERS_ACTION = ['education-points', 'healthcare-points', 'transport-points'];
const initialViewState = {
  latitude: 14.0583,
  longitude: 108.2772,
  zoom: 7
};

function App() {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({ ...initialViewState });
  const [sourcesData, setSourcesData] = useState(null);
  const [sourcesDataFlag, setSourcesDataFlag] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [osmInfo, setOsmInfo] = useState(null);

  // fetch data
  useEffect(() => {
    const fetchData = async ({ name_code }) => {
      setOsmInfo(null);
      try {
        const educationData = await fetchLocalCsv(name_code, 'education');
        const healthcareData = await fetchLocalCsv(name_code, 'healthcare');
        const transportData = await fetchLocalCsv(name_code, 'transport');
        const adminBoundary = await fetchLocalGeojson(name_code, 'ADM0');

        setSourcesData({
          educationData,
          healthcareData,
          transportData,
          adminBoundary
        });
        setSourcesDataFlag({
          education_osm_data_layer: false,
          healthcare_osm_data_layer: false,
          transport_osm_data_layer: false,
          population_density_layer: false,
          services_inaccessibility_index_layer: true
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
    mapRef.current?.flyTo({
      center: [selectCountry.center.longitude, selectCountry.center.latitude],
      zoom: 8,
      duration: 2000
    });
  };

  const handlesetSourcesDataFlag = (layer_id) => (event) => {
    setSourcesDataFlag({
      ...sourcesDataFlag,
      [layer_id]: event.target.checked
    });
  };
  const handleMapClick = (event) => {
    try {
      const { x, y } = event.point;
      const features = mapRef.current.queryRenderedFeatures([x, y]);
      const new_features = features.filter((i) => i.layer && LAYERS_ACTION.includes(i.layer.id));

      if (new_features.length) {
        const i = { ...new_features[0], lngLat: event.lngLat };
        setOsmInfo({ ...i });
      } else {
        setOsmInfo(null);
      }
    } catch (error) {
      setOsmInfo(null);
      console.error(error);
    }
  };
  const handleMapHover = (event) => {
    try {
      const { x, y } = event.point;
      const features = mapRef.current.queryRenderedFeatures([x, y]);
      const new_features = features.filter((i) => i.layer && LAYERS_ACTION.includes(i.layer.id));

      if (new_features.length) {
        const i = { ...new_features[0], lngLat: event.lngLat };
        setHoverInfo({ ...i });
      } else {
        setHoverInfo(null);
      }
    } catch (error) {
      setHoverInfo(null);
      console.error(error);
    }
  };

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
        <StaticMap
          ref={mapRef}
          initialViewState={viewState}
          onLoad={handleLoad}
          minZoom={6}
          maxZoom={15}
          mapStyle="mapbox://styles/junica123/clx4w5d0p08dn01nx9vmbhyio"
          mapboxAccessToken={API_TOKEN}
          onClick={handleMapClick}
          onMouseMove={handleMapHover}
        >
          <DataLayerWrap
            sourcesDataFlag={sourcesDataFlag}
            sourcesData={sourcesData}
            countryData={selectedCountry}
          />
          <ScaleControl position="top-left" />
          <NavigationControl position="top-left" />
          <CustomPopUp hoverInfo={hoverInfo} />
        </StaticMap>
        <Sidebar
          handleChangeSelect={handleChange}
          selectedCountry={selectedCountry}
          layersCheckbox={sourcesDataFlag}
          setCheckboxLayer={handlesetSourcesDataFlag}
          osmInfo={osmInfo}
        />
      </div>
    </div>
  );
}

export default App;
