import { GiWireCoil } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { FaPrescriptionBottle } from "react-icons/fa";
import ProductCard from "../Fragments/ProductCard";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Button } from "../ui/button";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/detailLiquid/stock").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <>
      <div className="mt-12 container" id="services">
        <div className="mb-28">
          {/*Services Section*/}
          <h1 className="text-3xl font-bold text-center text-primaryGreen dark:text-primaryOrange">
            Our Services
          </h1>
          <div className="lg:flex mt-8 mb-8 text-center font-medium gap-x-8">
            <div className="flex flex-col justify-center items-center mt-8">
              <GiWireCoil size={50} />
              <h1 className="font-bold text-xl text-secondaryGreen dark:text-primaryOrange">
                Coiling
              </h1>
              <h1 className="text-secondaryGreen dark:text-secondaryOrange">
                Get custom coils for optimal flavor and
                clouds. Our experts craft high-quality coils
                tailored to your needs.
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <FaPrescriptionBottle size={50} />
              <h1 className="font-bold text-xl text-secondaryGreen dark:text-primaryOrange">
                Liquid
              </h1>
              <h1 className="text-secondaryGreen dark:text-secondaryOrange">
                Explore our premium e-liquids. From fruity
                to creamy, find your perfect flavor and
                enjoy exceptional vapor production.
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center mt-8">
              <IoIosSettings size={50} />
              <h1 className="font-bold text-xl text-secondaryGreen dark:text-primaryOrange">
                Repair
              </h1>
              <h1 className="text-secondaryGreen dark:text-secondaryOrange">
                Fast and reliable repair services for all
                vaping devices. Our skilled technicians
                ensure your device is back to peak
                performance quickly.
              </h1>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-center mb-4 text-3xl font-bold text-primaryGreen dark:text-primaryOrange">
            <span className="text-red-700">HOT!</span>{" "}
            Liquid This Month
          </h1>
          <div className="lg:flex gap-x-4 whitespace-pre-line">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard
                key={index}
                productImage={product.image}
                productTitle={product.name}
                productDescription={`Material : ${product.material}\nNicotine : ${product.nicotine}mg\nTaste : ${product.taste}`}
                btnClass={"hidden"}
                classMain="mt-4"
              />
            ))}
          </div>
        </div>

        <div
          className="mt-8 justify-end mb-12"
          id="location">
          <h1 className="font-bold text-3xl mb-4">
            Location{" "}
          </h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.649184324355!2d106.10396061087931!3d-6.3097348936531645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4222e4ffffffff%3A0x996840015f4ab750!2sAlun-Alun%20Pandeglang!5e0!3m2!1sen!2sid!4v1716802160816!5m2!1sen!2sid"
            className="w-full h-96 md:w-3/4 md:h-96"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
