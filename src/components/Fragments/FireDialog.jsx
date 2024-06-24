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
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

const FireDialog = () => {
  const { toast } = useToast();
  const [employe, setEmployee] = useState([]);
  const [employeId, setEmployeId] = useState("");
  useEffect(() => {
    axiosInstance.get("/auth/employe").then((res) => {
      setEmployee(res.data);
    });
  }, []);

  const handleFire = (e) => {
    e.preventDefault();
    axiosInstance
      .delete(`/auth/employe/${employeId}`)
      .then((res) => {
        setInterval(() => {
          window.location.reload();
        }, 500);
        toast({
          variant: "success",
          title: "Success",
          description: "Employe Fired Successfully",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: `${err.message}`,
        });
      });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Fire Employe</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fire Employe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Select onValueChange={setEmployeId}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Select Employe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Employee Name</SelectLabel>
                    {employe.map((employe) => (
                      <SelectItem
                        key={employe.id}
                        value={employe.id}>
                        {employe.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => handleFire(e)}
              type="submit"
              className="bg-red-400 hover:bg-red-800">
              Fire Employe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FireDialog;
