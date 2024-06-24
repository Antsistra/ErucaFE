const DefaultCard = (props) => {
  const { title, content } = props;
  return (
    <a
      href="#"
      className="block lg:w-96 w-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {title}
      </h5>
      <p className=" text-gray-700 dark:text-gray-400 font-bold text-xl text-center">
        {content}
      </p>
    </a>
  );
};

export default DefaultCard;
