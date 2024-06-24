import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { login, register } from "@/services/auth.service";

const LoginLayouts = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] =
    useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerData = {
    name: name,
    email: emailRegister,
    password: passwordRegister,
    role: "User",
  };
  const loginData = {
    email: email,
    password: password,
  };
  const handleRegister = (e) => {
    e.preventDefault();
    register(registerData, (status, res) => {
      if (status) {
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
  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData, (status, res) => {
      if (status) {
        localStorage.setItem("token", res.data.data.token);
        const role = res.data.data.user.role;
        if (role === "Admin") {
          setInterval(() => {
            window.location.href = "/admin/dashboard";
          }, 500);
        } else if (role === "Cashier") {
          setInterval(() => {
            window.location.href = "/cashier/dashboard";
          }, 500);
        } else {
          setInterval(() => {
            window.location.href = "/dashboard";
          }, 500);
        }
        localStorage.setItem("email", email);
        toast({
          variant: "success",
          title: "Success",
          description: "Login Successfully",
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
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Login
              </CardTitle>
              <CardDescription className="">
                {`Welcome Back Sir, Please Login To Your Account`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Johndoe123@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/">
                <Button variant="outline">Back</Button>
              </Link>
              <Button
                className="ml-auto bg-primaryBackground text-primaryForeground hover:bg-[#748D92]"
                type="submit"
                onClick={(e) => handleLogin(e)}>
                Login
              </Button>{" "}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                Register
              </CardTitle>
              <CardDescription>
                {`If you dont have an account Just Register To
                being our Family :)`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Full Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  id="current"
                  type="email"
                  placeholder="Johndoe123@mail.com"
                  onChange={(e) =>
                    setEmailRegister(e.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Password</Label>
                <Input
                  id="current"
                  type="password"
                  placeholder="*******"
                  onChange={(e) =>
                    setPasswordRegister(e.target.value)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="ml-auto">
                <Button
                  onClick={(e) => handleRegister(e)}
                  className="bg-primaryBackground text-primaryForeground hover:bg-[#748D92]">
                  Register
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default LoginLayouts;
