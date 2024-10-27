import { Router } from "express";
import { protect, signinUser, signupUser } from "../controllers/usersController.js";
import { getUserProducts } from "../controllers/productsController.js";

const usersRouter = Router();

usersRouter.route("/signin").post(signinUser);
usersRouter.route("/signup").post(signupUser);

usersRouter.use(protect);

usersRouter.route("/:userId/products").get(getUserProducts);

export default usersRouter;