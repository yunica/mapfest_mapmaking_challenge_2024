import { FaRegHospital } from 'react-icons/fa';
import { MdOutlineDirectionsTransit } from 'react-icons/md';
import { FaPeopleRoof, FaSchoolFlag } from 'react-icons/fa6';
import { TbHomePlus } from 'react-icons/tb';
import LegendColor from './legendColor';

const checkBox = ({ value, text, handleChange }) => {
  if (!text) return null;
  const textIco = text.split('_')[0];
  let ico, legend, textLabel;

  switch (textIco) {
    case 'education':
      textLabel = 'education - osm';
      ico = <FaSchoolFlag size={20} />;
      break;
    case 'healthcare':
      textLabel = 'healthcare - osm';
      ico = <FaRegHospital size={20} color="#ff5151" />;
      break;
    case 'transport':
      textLabel = 'transport - osm';
      ico = <MdOutlineDirectionsTransit size={20} color="#3778ff" />;
      break;
    case 'population':
      textLabel = 'population - worldpop ';

      ico = <FaPeopleRoof size={20} color="#ffcb23" />;
      legend = (
        <LegendColor
          colors={['linear-gradient(to right, #420a68, #932667, #dd5139, #fca40b, #fcffa4)']}
          milestones={['Low', 'Medium', 'High']}
        />
      );
      break;
    case 'services':
      textLabel = 'services inaccessibility index ';
      ico = <TbHomePlus size={22} color="#ff5151" />;
      legend = (
        <LegendColor
          colors={['linear-gradient(to right, #045482, #92c5de, #f7f7f7, #f4a582, #ca0020)']}
          milestones={['Low', 'Medium', 'High']}
        />
      );

      break;
    default:
      break;
  }

  return (
    <div className="flex items-start w-full gap-2 mb-2">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="flex items-start w-full gap-1">
        {ico}
        <label className="flex flex-col w-full text-sm font-normal ">
          {textLabel}
          {legend}
        </label>
      </div>
    </div>
  );
};

export default checkBox;
