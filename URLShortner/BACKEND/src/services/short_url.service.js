import { generateNanoid } from "../utils/helper.js";
import { Create_short_url, getCustomSlug } from "../DAO/short_url.js";
import { AppError } from "../utils/appError.js";

export const  shortUrl_WithoutUser_Service = async (url) => {
  const shortUrl = generateNanoid(7);

  if (!shortUrl) {
    //checking if object is not present
    throw new AppError("Short URL is not generated");
  }
  const new_url = await Create_short_url(url, shortUrl);
  //console.log("Saved URL:", url);
  return new_url;
};

export const shortUrl_WithUser_Service = async (url, userId, slug = null) => {
  const shortUrl = slug ? slug : generateNanoid(7);
  if (slug == null) {
    const IsExist = await getCustomSlug(slug);
    if (IsExist) {
      throw new AppError("Custom short URL already exists", 409);
    }
  }

  await Create_short_url(url, shortUrl, userId);

  console.log("Saved URL:", shortUrl);

  return process.env.APP_URL+shortUrl;
};
