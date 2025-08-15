// This Dao is data access object

import urlSchema from "../models/short_url.model.js";
import { AppError } from "../utils/appError.js";
export const Create_short_url = async (url, shortUrl, userId) => {
  const new_url = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  if (userId) {
    new_url.user = userId;
  }

  // Handling error while duplication occurs in genration new short url
  try {
    await new_url.save();
    return new_url;
  } catch (err) {
    if (err.code === 11000) {
      // Mongo duplicate key error
      throw new AppError("Short URL already exists", 409); // 409 = Conflict
    }
    // // For any other DB error, rethrow it
    throw err;
  }
};

export const findOriginalUrlFromShortUrl = async (id) => {
  
  const ShorturlObj = await urlSchema.findOneAndUpdate(
    // fetching the object via  short url
    { short_url: id },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  // If user is  giving random  id which is not correct

  if (!ShorturlObj) {
    //checking if object is not present
    throw new AppError("Short URL not found", 404);
  }

  // console.log(ShorturlObj);
  return ShorturlObj;
};


export  const getCustomSlug = async (slug) => {
    return await urlSchema.findOne({ short_url: slug });
}