import { Link } from "react-router-dom";
import { Button } from "./button";

const CardDetail = (props) => {
  const { title, price, image, id } = props;
  return (
    <>
      <div className="lg:max-w-52 max-w-32  overflow-hidden shadow-lg  h-52 lg:h-80">
        <Link to={`/dashboard/product/${id}`}>
          <img
            className="w-full"
            src={image}
            alt="Samsat"></img>
          <div className="px-4 py-2">
            <div className="font-semibold text-xs lg:text-md mb-2 line-clamp-2 mt-2">
              {title}
            </div>
            <p className="text-gray-700 dark:text-white text-base pb-2 font-bold text-sm lg:text-base mt-2 mb-2">
              {price}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};
export default CardDetail;
