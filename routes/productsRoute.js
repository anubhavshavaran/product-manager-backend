import { Router } from 'express';
import { createProduct, getAllProducts, getProduct } from '../controllers/productsController.js';
import { protect } from '../controllers/usersController.js';

const productRouter = Router();

productRouter.use(protect);

productRouter.route("/")
    .get(getAllProducts)
    .post(createProduct);

productRouter.route("/:slug")
    .get(getProduct)
    .delete();

export default productRouter;