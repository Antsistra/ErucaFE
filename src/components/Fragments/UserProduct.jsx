import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardDetail from "../ui/cardDetail";
import { axiosInstance } from "@/lib/axios";
import { Input } from "../ui/input";
import Promo from "./Promo";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => (
  <div className="p-4 w-full animate-pulse">
    <div className="h-48 bg-gray-300 rounded"></div>
    <div className="h-4 mt-4 bg-gray-300 rounded"></div>
    <div className="h-4 mt-2 bg-gray-300 rounded"></div>
  </div>
);

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/detailLiquid/stock")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsDropdownVisible(value !== "");
  };

  const handleProductClick = (productId) => {
    navigate(`/dashboard/product/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hot Product Section */}
      <div className="flex flex-col items-center justify-center mt-4 mb-4">
        <div className="w-full mb-4 relative">
          <Input
            className="bg-secondaryGreen opacity-75 hover:opacity-100 placeholder:text-white"
            placeholder="Cari Produk"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div
            className={`absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 z-10 max-h-60 overflow-y-auto transition-opacity duration-300 ${
              isDropdownVisible
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="p-2 border-none bg-secondaryGreen opacity-100 hover:bg-primaryGreen cursor-pointer"
                onClick={() =>
                  handleProductClick(product.id)
                }>
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 mr-2"
                  />
                  <div>
                    <div className="font-bold">
                      {product.name}
                    </div>
                    <div className="text-sm ">
                      Rp{" "}
                      {new Intl.NumberFormat(
                        "id-ID"
                      ).format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="p-2 text-gray-600">
                Produk tidak ditemukan
              </div>
            )}
          </div>
        </div>
        <Promo />
      </div>
      <h1 className="font-bold text-2xl">Best Seller!</h1>
      <Carousel className="w-full mt-2">
        <CarouselContent className="-ml-1">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                  <SkeletonCard />
                </CarouselItem>
              ))
            : products.slice(0, 8).map((product, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                  <div className="p-1">
                    <CardDetail
                      id={product.id}
                      title={product.name}
                      price={`Rp ${new Intl.NumberFormat(
                        "id-ID"
                      ).format(product.price)}`}
                      image={product.image}
                    />
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="lg:block hidden" />
        <CarouselNext className="lg:block hidden" />
      </Carousel>

      {/* Muffin Section */}
      <div className="mt-8">
        <h1 className="font-bold text-2xl">
          Muffin Series
        </h1>
        <Carousel className="w-full mt-2">
          <CarouselContent className="-ml-1">
            {loading
              ? Array.from({ length: 5 }).map(
                  (_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                      <SkeletonCard />
                    </CarouselItem>
                  )
                )
              : products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes("muffin")
                  )
                  .slice(0, 5)
                  .map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                      <div className="p-1">
                        <CardDetail
                          id={product.id}
                          title={product.name}
                          price={`Rp ${new Intl.NumberFormat(
                            "id-ID"
                          ).format(product.price)}`}
                          image={product.image}
                        />
                      </div>
                    </CarouselItem>
                  ))}
          </CarouselContent>
          <CarouselPrevious className="lg:block hidden" />
          <CarouselNext className="lg:block hidden" />
        </Carousel>
      </div>

      {/* Kratos Section */}
      <div className="mt-8">
        <h1 className="font-bold text-2xl">
          Kratos is Here!
        </h1>
        <Carousel className="w-full mt-2">
          <CarouselContent className="-ml-1">
            {loading
              ? Array.from({ length: 5 }).map(
                  (_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                      <SkeletonCard />
                    </CarouselItem>
                  )
                )
              : products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes("dewa")
                  )
                  .slice(0, 5)
                  .map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 basis-1/3 md:basis-1/3 lg:basis-1/5">
                      <div className="p-1">
                        <CardDetail
                          id={product.id}
                          title={product.name}
                          price={`Rp ${new Intl.NumberFormat(
                            "id-ID"
                          ).format(product.price)}`}
                          image={product.image}
                        />
                      </div>
                    </CarouselItem>
                  ))}
          </CarouselContent>
          <CarouselPrevious className="lg:block hidden" />
          <CarouselNext className="lg:block hidden" />
        </Carousel>
        {/* End of Kratos Section */}
        <h1 className="mt-12 text-2xl font-bold mb-4 ">
          Check All Product
        </h1>
        <div className="flex flex-row flex-wrap ">
          {loading
            ? Array.from({ length: products.length }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="w-1/3 lg:w-1/6 p-2 mb-4">
                    <SkeletonCard />
                  </div>
                )
              )
            : products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-1/3 lg:w-1/6 p-2 mb-4">
                  {" "}
                  {/* Menggunakan w-1/5 untuk 20% lebar per item */}
                  <CardDetail
                    id={product.id}
                    title={product.name}
                    price={`Rp ${new Intl.NumberFormat(
                      "id-ID"
                    ).format(product.price)}`}
                    image={product.image}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default UserProduct;
