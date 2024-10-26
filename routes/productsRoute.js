import { Router } from 'express';
import { createProduct, getAllProducts, getProduct } from '../controllers/productsController.js';

const productRouter = Router();

productRouter
    .route("/")
    .get(getAllProducts)
    .post(createProduct);

productRouter.route("/:slug").get(getProduct);

export default productRouter;