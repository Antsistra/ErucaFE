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
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";

const DeleteProductBtn = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    axiosInstance.get("/detailLiquid").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = (e) => {
    axiosInstance
      .delete(`/detailLiquid/${id}`)
      .then((res) => {
        toast({
          variant: "success",
          title: "Success",
          description: "Product Deleted Successfully",
        });
        window.location.reload();
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Product Deletion Failed",
        });
      });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            Delete Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Select onValueChange={setId}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Liquid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Liquid</SelectLabel>
                    {products.map((product) => (
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
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={(e) => handleDelete(e)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteProductBtn;
