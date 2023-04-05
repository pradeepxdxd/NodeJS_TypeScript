import express from "express";
import { Resgisteration, Login, ChangePassword } from "../controllers/auth.controller";

const router = express.Router();

router.post("/regis", Resgisteration);
router.post("/login", Login);
router.put("/change/:id", ChangePassword);

export default router;