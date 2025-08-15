import { axiosInstance } from "../utils/axiosInstance";



export const createShortUrl = async(originalUrl) =>{
    return await axiosInstance.post("/api/create", {
        url: originalUrl,
      });
}
