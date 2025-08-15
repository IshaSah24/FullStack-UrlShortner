import { axiosInstance } from "../utils/axiosInstance";

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post(
    "./api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return data;
};



export const registerUser = async (email, password, name) => {
  const { data } = await axiosInstance.post(
    "./api/auth/register",
    { email, password, name },
    { withCredentials: true }
  );
  return data;
};

export const ValidateUser = async () => {
  const { data } = await axiosInstance.get("./api/auth/me",);
//  console.log("data is  here",data);
return data;
 
};


export const logoutUser = async () => {
  const { data } = await axiosInstance.get("./api/auth/logout");
  return data;
};
