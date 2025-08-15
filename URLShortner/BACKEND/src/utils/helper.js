import jsonwebtoken from  'jsonwebtoken';
import { nanoid } from "nanoid"
import  {TokenOptions}  from "../config/cookieOptions.js";

export const  generateNanoid = (length) =>{
    return nanoid(length);
}

export const  signToken = (payload)=>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET,TokenOptions());
}

export const  verifyToken = (token) =>{
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}