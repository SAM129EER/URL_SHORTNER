import express from 'express';
import {registerUserController} from "./auth.controller.js"
import { asyncHandler } from '../../utils/asyncHandler.js';
const router = express.Router();

router.post("/register" , asyncHandler(registerUserController))

export default router;