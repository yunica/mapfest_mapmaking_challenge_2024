import React, { useState } from "react";

import { FiEyeOff, FiEye } from "react-icons/fi";
import CustomSelect from "./select";
import { COUNTRIES } from "./constants";
import CheckBox from "./checkBox";

const Sidebar = ({
  handleChangeSelect,
  selectedCountry,
  layersCheckbox,
  setCheckboxLayer,
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
      <h1 className="mb-4 text-xl text-center">
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
        onChange={handleChangeSelect}
        selectedValue={selectedCountry}
      />
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
  );
};
export default Sidebar;
