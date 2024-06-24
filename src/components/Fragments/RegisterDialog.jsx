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
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { register } from "@/services/auth.service";

const RegisterDialog = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const registerData = {
    name: name,
    email: email,
    password: password,
    role: role,
  };
  const handleRegister = (e) => {
    e.preventDefault();
    register(registerData, (status, res) => {
      if (status) {
        setInterval(() => {
          window.location.reload();
        }, 500);
        toast({
          variant: "success",
          title: "Success",
          description:
            "Register Successfully, Letsgo Login!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An Error Occured",
          description: `${res.response.data}`,
        });
      }
    });
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Employe</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="Joko"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="joko@mail.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="password"
                className="text-right">
                Password
              </Label>
              <Input
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                type="password"
                id="password"
                placeholder="********"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right">
                Role
              </Label>
              <Select onValueChange={setRole}>
                <SelectTrigger className="w-[275px]">
                  <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="Admin">
                      Admin
                    </SelectItem>
                    <SelectItem value="Cashier">
                      Cashier
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={(e) => handleRegister(e)}
              type="submit"
              className="bg-teal-400 hover:bg-teal-800 font-bold">
              Add Employe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterDialog;
