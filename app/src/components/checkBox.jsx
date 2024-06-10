import { FaRegHospital } from 'react-icons/fa';
import { MdOutlineDirectionsTransit } from 'react-icons/md';
import { FaPeopleRoof , FaSchoolFlag} from "react-icons/fa6";

const checkBox = ({ value, text, handleChange }) => {
  if (!text) return null;
  const textLabel = text.replaceAll('_', ' ');
  const textIco = text.split('_')[0];
  let ico = null;
  switch (textIco) {
    case 'education':
      ico = <FaSchoolFlag size={18} />;
      break;
    case 'healthcare':
      ico = <FaRegHospital size={18} color="#ff5151" />;
      break;
    case 'transport':
      ico = <MdOutlineDirectionsTransit size={20} color="#3778ff" />;
      break;
    case 'population':
      ico = <FaPeopleRoof size={20} color="#ffcb23" />;
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="flex items-center gap-1 text-sm font-normal -gray-900 ms-2 dark:text-gray-300">
        {ico}
        {textLabel}
      </label>
    </div>
  );
};

export default checkBox;
