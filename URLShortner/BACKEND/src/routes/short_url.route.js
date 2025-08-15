import express from "express";
import {createShortUrl, createCustomUrl} from  '../controller/short_url.controller.js'
import { isAuthenticated } from "../middlewares/auth.js";
import { attachUserIfAuthenticated } from "../middlewares/attachUserIfAuthenticated.js";
const router = express.Router();

router.post("/create",attachUserIfAuthenticated,createShortUrl);
router.post("/create/custom",isAuthenticated,createCustomUrl);
export default router;
