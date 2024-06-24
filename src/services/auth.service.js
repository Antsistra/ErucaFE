import { axiosInstance } from "@/lib/axios";
import { jwtDecode } from "jwt-decode";

export const login = (loginData, callback) => {
  axiosInstance
    .post("/auth/login", loginData)
    .then((res) => {
      callback(true, res);
      localStorage.setItem("token", res.data.data.token);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const register = (registerData, callback) => {
  axiosInstance
    .post("/auth/register", registerData)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
