import { axiosInstance } from "./config";

export const Register = async (formData) => {
  return await axiosInstance.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
