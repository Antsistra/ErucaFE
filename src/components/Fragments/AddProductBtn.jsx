import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { addNewProduct } from "@/services/product";
import { useToast } from "@/components/ui/use-toast";
import uploadcare from "uploadcare-widget";

const AddProductBtn = (props) => {
  const { title = "Add New Product" } = props;
  const [name, setName] = useState("");
  const [taste, setTaste] = useState("");
  const [material, setMaterial] = useState("");
  const [nicotine, setNicotine] = useState(0);
  const [formattedNicotine, setFormattedNicotine] =
    useState("");
  const [imageURL, setImageURL] = useState(null);
  const [price, setPrice] = useState(0);
  const [formattedPrice, setFormattedPrice] = useState("");
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();

    if (imageURL) {
      const productData = {
        name: name,
        taste: taste,
        material: material,
        nicotine: parseInt(nicotine),
        image: imageURL,
        price: parseInt(price),
      };

      addNewProduct(productData, (status, res) => {
        if (status) {
          toast({
            variant: "success",
            title: "Success",
            description: "Product Added Successfully",
          });
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to Add Product",
          });
          console.log(res);
        }
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image",
      });
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Hanya menyimpan angka
    setPrice(value);

    // Memformat nilai menjadi format rupiah
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

    setFormattedPrice(formattedValue);
  };

  const handleNicotineChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Hanya menyimpan angka
    setNicotine(value);

    // Menambahkan label "mg" pada nilai
    setFormattedNicotine(value + " mg");
  };

  const handleFileChange = (e) => {
    e.preventDefault(); // Mencegah penutupan modal
    uploadcare
      .openDialog(null, {
        publicKey: "134f11a158b071f762e2",
        crop: "1:1",
      })
      .done((file) => {
        file.promise().then((info) => {
          console.log("File URL:", info.cdnUrl);
          setImageURL(info.cdnUrl);
        });
      });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        {title}
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}>
          <div
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Add New Product
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}>
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleInput}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="name"
                    className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Product Name"
                    className="col-span-3"
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="taste"
                    className="text-right">
                    Taste
                  </Label>
                  <Input
                    id="taste"
                    placeholder="Mango"
                    onChange={(e) =>
                      setTaste(e.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="material"
                    className="text-right">
                    Material
                  </Label>
                  <Input
                    id="material"
                    onChange={(e) =>
                      setMaterial(e.target.value)
                    }
                    placeholder="Saltnic"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="nicotine"
                    className="text-right">
                    Nicotine
                  </Label>
                  <Input
                    id="nicotine"
                    placeholder="0 mg"
                    type="text"
                    value={formattedNicotine}
                    onChange={handleNicotineChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="image"
                    className="text-right">
                    Image
                  </Label>
                  <Button
                    id="image"
                    className="col-span-3 text-sm"
                    onClick={handleFileChange}>
                    Upload Image
                  </Button>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="price"
                    className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="text"
                    value={formattedPrice}
                    onChange={handlePriceChange}
                    placeholder="Rp 0"
                    className="col-span-3"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button type="submit">Add</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductBtn;
