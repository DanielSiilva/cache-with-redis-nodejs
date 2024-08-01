import { Router } from "express";
import { createUsers, getUser } from "../controllers/userController";

const router = Router();

router.post("/create", createUsers);
router.get("/:id", getUser);

export default router;
