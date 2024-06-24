import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Navbar from "../ui/navbar";
import { Input } from "../ui/input";
import ProductCard from "../Fragments/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "../ui/use-toast";

const CashierLayout = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(
        "/detailLiquid/stock"
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        if (
          updatedCart[existingProductIndex].qty <
          product.stock
        ) {
          updatedCart[existingProductIndex].qty += 1;
        } else {
          toast({
            variant: "destructive",
            title: "Stok Habis",
            description:
              "Jumlah yang dipilih melebihi stok yang tersedia",
          });
        }
        return updatedCart;
      } else {
        if (product.stock > 0) {
          return [...prevCart, { ...product, qty: 1 }];
        } else {
          toast({
            variant: "destructive",
            title: "Stok Habis",
            description: "Produk ini sudah habis",
          });
          return prevCart;
        }
      }
    });
  };

  const increaseQty = (productId) => {
    const productInStock = products.find(
      (product) => product.id === productId
    );
    if (productInStock.stock === 0) {
      toast({
        variant: "destructive",
        title: "Stok Habis",
        description: "Produk ini sudah habis",
      });
      return;
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          if (item.qty < productInStock.stock) {
            return { ...item, qty: item.qty + 1 };
          } else {
            toast({
              variant: "destructive",
              title: "Stok Habis",
              description:
                "Jumlah yang dipilih melebihi stok yang tersedia",
            });
          }
        }
        return item;
      });
    });
  };

  const decreaseQty = (productId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  const calculateItemTotal = (item) => {
    return item.qty * item.price;
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handlePayment = async () => {
    const totalAmount = calculateTotalPrice();
    const totalSales = cart.reduce(
      (total, item) => total + item.qty,
      0
    );

    if (totalAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Isi Dulu Keranjangnya Mas",
      });
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/create-transaction",
        {
          amount: totalAmount,
          products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            total: calculateItemTotal(item),
          })),
        }
      );

      const { token } = response.data;

      window.snap.pay(token, {
        onSuccess: async function (result) {
          toast({
            variant: "success",
            title: "Success",
            description: "Pembayaran Berhasil",
          });
          setInterval(() => {
            window.location.reload();
          }, 2000);
          // Kurangi stok di database dan simpan transaksi
          try {
            await axiosInstance.post(
              "/detailLiquid/reduce-stock",
              {
                cart,
                userId: 1, // Gantilah dengan userId yang sesuai
              }
            );
            await axiosInstance.patch(
              "transaction/update",
              {
                income: totalAmount,
                totalSales: totalSales,
              }
            );
            setCart([]);
            await fetchProducts(); // Fetch ulang produk setelah pembayaran sukses
          } catch (error) {
            console.error(
              "Error reducing stock or saving transaction",
              error
            );
            toast({
              variant: "destructive",
              title: "Error",
              description:
                "Gagal Mengurangi Stok atau Menyimpan Transaksi",
            });
          }
        },
        onPending: function (result) {
          toast({
            variant: "destructive",
            title: "Pending",
            description: "Pembayaran Pending",
          });
        },
        onError: function (result) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Pembayaran Gagal",
          });
        },
        onClose: function () {
          alert(
            "Pembayaran ditutup tanpa menyelesaikan transaksi"
          );
        },
      });
    } catch (error) {
      console.error(
        "Error during transaction creation",
        error
      );
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal Membuat Transaksi",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-slate-800 ">
        <Navbar>
          <div className="flex gap-x-4">
            <Button
              className="bg-primaryForeground text-primaryBackground font-bold ml-4 "
              onClick={(e) => handleLogout(e)}>
              Log Out
            </Button>
            <Button
              className="ml-auto bg-primaryForeground text-primaryBackground "
              onClick={() => setIsCartOpen(true)}>
              🛒
            </Button>
          </div>
        </Navbar>

        <div className="lg:flex justify-center pt-4 lg:mx-12my-4">
          <div className="flex flex-wrap lg:w-4/6 py-2 gap-x-4 gap-y-4 mx-4 mb-4">
            <Input
              className="w-[1080px] "
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {filteredProducts.map((product) =>
              product.stock !== 0 ? (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  productImage={product.image}
                  productTitle={product.name}
                  descriptionClass="text-md"
                  productDescription={
                    `Sisa Stock : ${product.stock}` || "0"
                  }
                  productPrice={`Rp ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(product.price)}`}
                  btnClass="bg-primaryForeground hover:bg-primaryBackground"
                  btnChildren="🛒"
                  onClick={() => handleAddToCart(product)}
                />
              ) : (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  descriptionClass="text-md text-red-700 font-bold"
                  productImage={product.image}
                  productTitle={product.name}
                  productDescription={
                    product.description || "OUT OF STOCK"
                  }
                  productPrice={`Rp ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(product.price)}`}
                  btnChildren="Out of Stock"
                  btnClass="bg-red-700 disabled hover:bg-red-700 cursor-not-allowed"
                />
              )
            )}
          </div>
        </div>
      </div>
      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full lg:w-1/4  w-full  bg-white shadow-lg transform  z-20 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <h1 className="text-3xl font-bold text-primaryForeground mb-4 mt-4">
            Cart
          </h1>
          <button
            className="text-gray-600 hover:text-gray-800 font-bold"
            onClick={() => setIsCartOpen(false)}>
            X
          </button>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-md mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="ml-2 bg-gray-200 px-2 rounded">
                        -
                      </button>
                      <span className="mx-2">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-gray-200 px-2 rounded">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-lg font-semibold">{`Rp ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(item.price)}`}</span>
                  <span className="ml-4 text-gray-600">{`= Rp ${new Intl.NumberFormat(
                    "id-ID"
                  ).format(
                    calculateItemTotal(item)
                  )}`}</span>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">
            Total:{" "}
            {`Rp ${new Intl.NumberFormat("id-ID").format(
              calculateTotalPrice()
            )}`}
          </h2>
          <Button
            className="bg-primaryForeground text-primaryBackground font-bold mt-4 w-full"
            onClick={handlePayment}>
            Bayar Sekarang
          </Button>
        </div>
      </div>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsCartOpen(false)}></div>
      )}
    </>
  );
};

export default CashierLayout;
