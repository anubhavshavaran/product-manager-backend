import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct } from '../controllers/productsController.js';
import { protect } from '../controllers/usersController.js';

const productRouter = Router();

productRouter.route("/").get(getAllProducts);
productRouter.route("/:slug").get(getProduct);

productRouter.use(protect);

productRouter.route("/").post(createProduct);
productRouter.route("/:slug")
    .delete(deleteProduct);

export default productRouter;