import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "../ui/use-toast";

const AccountDetailsLayout = () => {
  const { toast } = useToast();
  const email = localStorage.getItem("email");

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = (e) => {
    axiosInstance
      .post("/auth/change-password", {
        email: email,
        currentPassword: currPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        toast({
          variant: "success",
          title: "Success",
          description:
            "Password Successfully Changed, Back To Login!",
        });
        localStorage.clear();
        setInterval(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response.data,
        });
      });
  };
  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click
                Update when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  className="disabled"
                  id="email"
                  placeholder="loremipsum@mail.com"
                  value={email}
                  disabled // Add the disabled attribute here
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">
                  Current Password
                </Label>
                <Input
                  id="username"
                  type="password"
                  placeholder="****"
                  onChange={(e) =>
                    setCurrPassword(e.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">
                  New Password
                </Label>
                <Input
                  id="username"
                  type="password"
                  placeholder="****"
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={(e) => handleUpdate(e)}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <h1 className="text-center mb-4 text-xl lg:text-3xl font-bold">
              Belum Selesai Coy!
            </h1>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AccountDetailsLayout;
