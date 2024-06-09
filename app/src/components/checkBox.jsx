const checkBox = ({ value, text, handleChange }) => {
  if (!text) return null;
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
        {text.replaceAll('_', ' ')}
      </label>
    </div>
  );
};

export default checkBox;
