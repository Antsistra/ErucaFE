import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { addStock } from "@/services/product";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

const AddStockButton = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const data = {
    id: productId,
    quantity: quantity,
  };
  useEffect(() => {
    axiosInstance.get("/detailLiquid/stock").then((res) => {
      setProduct(res.data);
    });
  }, []);
  const handleAddStock = () => {
    addStock(data, (status, res) => {
      if (status) {
        toast({
          variant: "success",
          title: "Success",
          description: "Stock Added Successfully",
        }),
          setProductId("");
        setQuantity(0);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to Add Stock: ${res.response.data}`,
        });
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-teal-300">
          Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Select onValueChange={setProductId}>
              <SelectTrigger className="w-[270px]">
                <SelectValue placeholder="Select Liquid Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Liquid Name</SelectLabel>
                  {product.map((product) => (
                    <SelectItem
                      key={product.id}
                      value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="20pcs"
              className="col-span-3"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={(e) => handleAddStock(e)}>
            Add Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStockButton;
