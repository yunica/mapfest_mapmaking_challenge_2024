import { FiEyeOff } from "react-icons/fi";
import CustomSelect from "./select";
import {
  COUNTRIES,
} from "./constants";


const Sidebar = ({setIsSidebarVisible, handleChange, selectedCountry}) => {

return (<div className="absolute w-1/4 p-2 bg-gray-200 rounded-lg top-4 right-2 bottom-8 dark:bg-gray-700 ">
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

</div>)
}
export default Sidebar