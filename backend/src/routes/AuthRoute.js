import { Signup,Login } from "../controllers/AuthController.js";
import { Router } from "express";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification)

export default router;