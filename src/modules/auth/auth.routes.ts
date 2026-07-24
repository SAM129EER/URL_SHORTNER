import express from 'express';
import {loginUserController, registerUserController} from "./auth.controller.js"
import { asyncHandler } from '../../utils/asyncHandler.js';
const router = express.Router();

router.post("/register" , asyncHandler(registerUserController))
router.post("/login" , asyncHandler(loginUserController))
export default router;