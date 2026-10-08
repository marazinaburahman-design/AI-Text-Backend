import { Router } from "express";
import { transform } from "../controllers/transformController.js";

const router = Router();

router.post("/", transform);

export default router;
