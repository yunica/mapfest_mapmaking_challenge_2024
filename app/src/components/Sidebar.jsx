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
        onClick={() => setIsSidebarVisible(true)}>
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
          <h3 className="text-center text-md">Population Density and Public Services Map</h3>
          <button
            className="flex items-center px-2 text-sm text-white bg-gray-200 rounded dark:bg-gray-700"
            onClick={() => setIsSidebarVisible(false)}
            data-tooltip-target="tooltip-hidde"
            type="button">
            <FiEyeOff />
          </button>
        </div>
        <CustomSelect
          options={COUNTRIES}
          onChange={handleChangeSelect}
          selectedValue={selectedCountry}
        />
        <div className="layers">
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
            maxHeight: 'calc(100vh - 32px - 15px - 16px -  48px - 16px - 66px - 16px - 144px )'
          }}>
          <div className="flex-grow overflow-auto min-h-[30vh]">
            <h3 className="mb-1">Description</h3>
            <p className='text-sm text-justify '>
              The app showcases the population distribution
              across various regions, including Pakistan, Afghanistan, Nepal, Myanmar, Laos, and
              Vietnam, alongside the location of a variety of public services obtained from
              OpenStreetMap. The aim is to assess whether the quantity of available services is
              adequate relative to the population size in these areas. This visualization allows for
              the identification of areas with high population density and limited service
              availability, as well as areas with a higher availability of services in proportion to
              the resident population. These findings can be instrumental in planning and
              policymaking efforts aimed at improving access to basic services in these regions.
            </p>
          </div>
          <OsmData osmInfo={osmInfo} />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
