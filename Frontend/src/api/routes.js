import { axiosInstance } from "./config";

export const Register = async (formData) => {
  return await axiosInstance.post("/auth/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const ActivateUserAccount = async (str) => {
  return await axiosInstance.post("/auth/activation", str);
};
export const UserLogin = async(payload)=>{
  return await axiosInstance.post('/auth/signin',payload)
}
