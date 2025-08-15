import { findById } from "../DAO/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const attachUserIfAuthenticated = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return next();

  const decoded = verifyToken(token);
  const user = await findById(decoded.id);
  if (user) req.user = user;

  next();
};
