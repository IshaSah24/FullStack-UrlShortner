import {
  shortUrl_WithoutUser_Service,
  shortUrl_WithUser_Service,
} from "../services/short_url.service.js";
import { findOriginalUrlFromShortUrl } from "../DAO/short_url.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/TryCatchWrapper.js";

export const createShortUrl = catchAsync(async (req, res) => {
  const { url } = req.body;
  let  NewShortUrlData = null;
  
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
/* this only returns generated shortUrl
----------------------------------------*/

console.log("user data  from  req object",req.user);
if (req.user) {
   NewShortUrlData = await shortUrl_WithUser_Service(url , req.user._id);
  }else {
  NewShortUrlData = await shortUrl_WithoutUser_Service(url);
  }

  /*checking if object is not present
  ----------------------------------------*/
  if (!NewShortUrlData) {
    throw new AppError("short url already  exist", 404);
  }else {
    console.log(NewShortUrlData);
    
  }

  return res.status(201).json({
    full_url : NewShortUrlData.full_url, 
    short_url : NewShortUrlData, 
    clicks:  NewShortUrlData.clicks,
    id :  NewShortUrlData._id
  });
});

export const redirectShortUrl = catchAsync(async (req, res) => {
  const { id } = req.params;
  const url = await findOriginalUrlFromShortUrl(id);
  res.redirect(url.full_url);
});

export  const createCustomUrl = catchAsync(async (req, res) => {
    const  {url, slug} = req.body;  // i  am  not  sure  that  always  the  slug  coming  or  not  so take all  the  req.body  objet  and then  pass it  as  an  argument  manually 
    console.log(req.user);
    
    if (req.user){
      const  newSlug =  await shortUrl_WithUser_Service(url, req.user._id, slug);
      return res.status(201).json({
        message: "Custom short URL created successfully",
        short_url: process.env.APP_URL+slug,
        id: newSlug._id,
      });
      
    }else {
      throw new AppError("User not authenticated", 401);
    }
})        