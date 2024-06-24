import { axiosInstance } from "@/lib/axios";

export const addNewProduct = async (data, callback) => {
  axiosInstance
    .post("/detailLiquid/add", data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const addStock = async (data, callback) => {
  axiosInstance
    .patch(
      `/detailLiquid/update/${data.id}/${data.quantity}`
    )
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
