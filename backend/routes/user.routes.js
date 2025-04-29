import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getusersForSideBar } from "../controllers/user.controller.js";

const router= express.Router()

router.get("/", protectRoute, getusersForSideBar)

export default router