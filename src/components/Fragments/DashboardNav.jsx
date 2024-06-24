import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

const DashboardNav = (props) => {
  const { children } = props;
  const { toast } = useToast();
  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          }, 500);
          localStorage.removeItem("cart");
          try {
            await axiosInstance.post(
              "/detailLiquid/reduce-stock",
              {
                cart,
                userId: 1,
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
            await fetchProducts();
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

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-primaryBackground border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">
                  Open sidebar
                </span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <a
                href="/dashboard"
                className="flex ms-2 md:me-24">
                <img
                  src="https://ucarecdn.com/88e77a97-1b4e-40b8-84c7-75cc09b65226/HJHJHJmin1.png"
                  className="h-8 me-3"
                  alt="Eruca VapeStore Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Eruca VapeStore
                </span>
              </a>
            </div>
            <div className="flex items-center">
              {/* Cart */}
              <Button onClick={() => setIsCartOpen(true)}>
                🛒
              </Button>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className={`ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 transition duration-500 ease-in-out transform ${
                  theme === "light"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-700 text-yellow-500"
                }`}>
                <span
                  className={`transition duration-500 ease-in-out transform ${
                    theme === "light"
                      ? "rotate-0"
                      : "rotate-180"
                  }`}>
                  {theme === "light" ? "☀️" : "🌙"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } bg-primaryBackground border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-primaryBackground dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/dashboard">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Product
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/account-details">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Account Details
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <Link to="/error">
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Riwayat Transaksi
                  </span>
                </p>
              </Link>
            </li>

            <li>
              <Link to="/" onClick={handleLogout}>
                <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Log Out
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-14">{children}</div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full lg:w-1/4 w-full bg-primaryBackground  dark:bg-gray-800 shadow-lg transform z-50 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <h1 className="text-3xl font-bold text-primaryOrange mb-4 mt-4">
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
            className="bg-[#D7AF70] mt-4 w-full"
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

export default DashboardNav;
