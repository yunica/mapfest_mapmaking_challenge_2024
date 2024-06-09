import React, { useState } from 'react';

const CustomSelect = ({ options, onChange, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mb-4">
      <p>Countries</p>
      <button
        className="flex items-center justify-start w-full p-2 bg-white border rounded dark:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.iso_code === selectedValue.iso_code).ico}
        <span className="text-white">
          {options.find((option) => option.iso_code === selectedValue.iso_code).name}
        </span>
        <svg
          className="w-4 h-4 ml-auto text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border rounded dark:bg-gray-800 max-h-60">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option.ico}
              <span className="ml-2 text-white">{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
