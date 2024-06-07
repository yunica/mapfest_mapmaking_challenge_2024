const Button = ({ ico, name, onClick }) => {
  return (
    <button
      type="button"
      className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-small rounded-lg text-sm  px-2 py-2 text-left inline-flex dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2 mx-1"
      onClick={onClick}
    >
      {ico}
      {name}
    </button>
  );
};

export default Button;
