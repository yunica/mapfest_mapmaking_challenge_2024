import React, { useState, useEffect } from 'react';

import { FiEyeOff, FiEye } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import CustomSelect from './select';
import { COUNTRIES } from './constants';
import CheckBox from './checkBox';
import OsmData from './osmData';

const Sidebar = ({
  handleChangeSelect,
  selectedCountry,
  layersCheckbox,
  setCheckboxLayer,
  osmInfo
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isSidebarVisible) {
    return (
      <button
        className="absolute p-2 text-sm bg-gray-200 rounded text-slate-500 dark:text-slate-200 top-4 right-2 dark:bg-gray-700"
        onClick={() => setIsSidebarVisible(true)}>
        <div className="flex items-center justify-start ">
          <FiEye />
          <label className="ml-2">Show panel</label>
        </div>
      </button>
    );
  }

  return (
    <div className="absolute p-2 bg-white rounded-lg text-slate-500 dark:text-slate-200 lg:w-1/5 top-4 right-2 bottom-8 dark:bg-gray-700 md:w-1/4 sm:w-1/2 xs:w-1/2 ">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="text-center text-md ">Inaccessibility to public services</h3>
          <div className="flex flex-col items-center px-2 gap-y-2 text-md">
            <button
              className="rounded "
              onClick={() => setIsSidebarVisible(false)}
              data-tooltip-target="tooltip-hidde"
              type="button">
              <FiEyeOff />
            </button>
            <button
              className="rounded "
              onClick={handleDarkMode}
              data-tooltip-target="tooltip-hidde"
              type="button">
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>
        <CustomSelect
          options={COUNTRIES}
          onChange={handleChangeSelect}
          selectedValue={selectedCountry}
        />
        <div className="my-1">
          <h3 className="mb-2">Layers</h3>
          {layersCheckbox && Object.keys(layersCheckbox).length
            ? Object.keys(layersCheckbox).map((layer) => (
                <CheckBox
                  key={layer}
                  value={layersCheckbox[layer]}
                  text={layer}
                  handleChange={setCheckboxLayer(layer)}
                />
              ))
            : null}
        </div>
        <div
          className="flex flex-col flex-auto h-full overflow-y-auto"
          style={{
            maxHeight:
              'calc(100vh - 32px - 15px - 16px -  72px - 16px - 66px - 16px - 236px - 16px )'
          }}>
          <div className="flex-grow overflow-auto min-h-[10vh]">
            <h3 className="mb-1">Description</h3>
            <p className="text-sm ">
              Utilizing{' '}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline">
                OpenStreetMap
              </a>{' '}
              and{' '}
              <a
                href="https://www.worldpop.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline">
                population datasets
              </a>{' '}
              , this application conducts a comprehensive analysis of population distribution and
              public service coverage. It identifies high-density areas lacking essential services,
              offering invaluable insights for urban planning and policy development,{' '}
              <a
                href="https://github.com/yunica/mapfest_mapmaking_challenge_2024"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline">
                more information.
              </a>
            </p>
            <p className="mt-2 text-sm ">
              The <b>{'Services Inaccessibility Index Layer'}</b> indicates areas with high
              population density but limited access to essential services such as transportation,
              healthcare, and education, as per{' '}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline">
                OpenStreetMap
              </a>{' '}
              data. Higher index values represent areas where residents face challenges in accessing
              these services.
            </p>
          </div>
          <OsmData osmInfo={osmInfo} />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
