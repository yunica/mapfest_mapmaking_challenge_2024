import React, { useState } from 'react';

import { FiEyeOff, FiEye } from 'react-icons/fi';
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

  if (!isSidebarVisible) {
    return (
      <button
        className="absolute p-2 text-sm text-white bg-gray-200 rounded top-4 right-2 dark:bg-gray-700"
        onClick={() => setIsSidebarVisible(true)}
      >
        <div className="flex items-center justify-start ">
          <FiEye />
          <label className="ml-2">Show panel</label>
        </div>
      </button>
    );
  }

  return (
    <div className="absolute p-2 text-white bg-gray-200 rounded-lg lg:w-1/5 top-4 right-2 bottom-8 dark:bg-gray-700 md:w-1/4 sm:w-1/2 xs:w-1/2 ">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="text-center text-md ">
            Public Services and Population Density Evaluation
          </h3>
          <button
            className="flex items-center px-2 text-sm text-white bg-gray-200 rounded dark:bg-gray-700"
            onClick={() => setIsSidebarVisible(false)}
            data-tooltip-target="tooltip-hidde"
            type="button"
          >
            <FiEyeOff />
          </button>
        </div>
        <CustomSelect
          options={COUNTRIES}
          onChange={handleChangeSelect}
          selectedValue={selectedCountry}
        />
        <div className="my-1">
          <h3 className="mb-2">Layers</h3>
          <div>
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
        </div>
        <div
          className="flex flex-col flex-auto h-full overflow-y-auto"
          style={{
            maxHeight:
              'calc(100vh - 32px - 15px - 16px -  72px - 16px - 66px - 16px - 236px - 16px )'
          }}
        >
          <div className="flex-grow overflow-auto min-h-[10vh]">
            <h3 className="mb-1">Description</h3>
            <p className="text-sm text-justify ">
              Utilizing{' '}
              <a
                href="https://www.worldpop.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline"
              >
                population datasets
              </a>{' '}
              and{' '}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline"
              >
                OpenStreetMap
              </a>{' '}
              , this application conducts a comprehensive analysis of population distribution and
              public service coverage. It identifies high-density areas lacking essential services,
              offering invaluable insights for urban planning and policy development.
            </p>
            <p className="mt-2 text-sm text-justify">
              The <b>{'Services Inaccessibility Index Layer'}</b> indicates areas with high
              population density but limited access to essential services such as transportation,
              healthcare, and education, as per{' '}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline hover:no-underline"
              >
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
