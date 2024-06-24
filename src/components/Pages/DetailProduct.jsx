import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardNav from "../Fragments/DashboardNav";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { jwtDecode } from "jwt-decode";
import SkeletonTest from "../Fragments/Skeleton";

const DetailProduct = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.Role;
    } catch (e) {
      console.error("Failed to decode token", e);
      navigate("/login");
    }
  } else {
    navigate("/login");
  }

  useEffect(() => {
    if (role !== "User") {
      navigate("/login");
    }
  }, [role, navigate]);

  useEffect(() => {
    axiosInstance.get(`/detailLiquid/${id}`).then((res) => {
      setProducts(res.data[0]);
    });
  }, [id]);

  useEffect(() => {
    setTotal(products.price * qty);
  }, [qty, products.price]);

  const handleAddToCart = () => {
    if (qty > products.stock) {
      toast({
        variant: "destructive",
        title: "Error, Something Happen",
        description:
          "Your order exceeds the stock, please be considerate",
      });
      return;
    }

    const cartItem = {
      id: products.id,
      name: products.name,
      image: products.image,
      price: products.price,
      qty: qty,
      total: total,
    };

    let existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingProductIndex !== -1) {
      const newQty =
        existingCart[existingProductIndex].qty +
        cartItem.qty;
      if (newQty > products.stock) {
        toast({
          variant: "destructive",
          title: "Error, Something Happen",
          description:
            "Your order exceeds the stock, please be considerate",
        });
        return;
      }
      existingCart[existingProductIndex].qty = newQty;
      existingCart[existingProductIndex].total =
        products.price * newQty;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );
    toast({
      variant: "success",
      title: "Success",
      description: "Item Added To Cart",
    });
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };

  const incrementQty = () => {
    if (qty < products.stock) {
      setQty(qty + 1);
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <>
      <Toaster />
      <DashboardNav>
        <div className="flex lg:flex-row flex-col lg:container mt-8 lg:mt-12 lg:gap-x-12">
          <img
            src={`${products.image}`}
            className="lg:w-1/4 rounded-lg p-4 bg-slate-200"
            alt=""
          />
          <div className="flex flex-col gap-y-4 lg:ml-12">
            <h1 className="font-bold text-4xl mt-4 lg:mt-0">
              {products.name}
            </h1>

            <h1 className="font-bold text-4xl">
              {`Rp${new Intl.NumberFormat("id-ID").format(
                products.price
              )}`}
            </h1>
            <span className="mt-4 font-semibold">
              Detail Product
            </span>
            <span>{`Taste : ${products.taste}`}</span>
            <span>{`Nicotine : ${products.nicotine}Mg`}</span>
            <span>{`Material : ${products.material}`}</span>
          </div>
          {products.stock > 0 ? (
            <div>
              <h1 className="font-bold mb-4 text-xl mt-4 lg:mt-0">
                Atur Jumlah
              </h1>
              <div className="flex items-center">
                <Button
                  onClick={decrementQty}
                  className="px-4 py-2 dark:bg-secondaryOrange text-red-600 font-extrabold  text-xl">
                  -
                </Button>
                <Input
                  type="number"
                  value={qty}
                  readOnly
                  className="text-center mx-2 font-semibold"
                />
                <Button
                  onClick={incrementQty}
                  className="px-4 py-2 text-green-400 dark:bg-secondaryOrange text-xl font-extrabold">
                  +
                </Button>
              </div>
              <h1 className="font-semibold mt-4">{`Sisa Stock ${products.stock}`}</h1>
              {total > 0 ? (
                <h1 className="font-semibold mt-4">
                  {`Total Belanjaan Rp${new Intl.NumberFormat(
                    "id-ID"
                  ).format(total)}`}
                </h1>
              ) : null}
              {total > 0 ? (
                <Button
                  className="w-full mt-4 dark:bg-secondaryOrange dark:text-white"
                  onClick={handleAddToCart}>
                  Keranjang
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="justify-center flex flex-col">
              <h1 className="font-bold text-red-700 text-3xl">
                This Product Out Of Stock
              </h1>
            </div>
          )}
        </div>
      </DashboardNav>
    </>
  );
};

export default DetailProduct;
