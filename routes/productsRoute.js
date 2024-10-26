import { Router } from 'express';
import { createProduct, getAllProducts } from '../controllers/productsController.js';

const productRouter = Router();

productRouter
    .route("/")
    .get(getAllProducts)
    .post(createProduct);

productRouter.route("/:id").get();

export default productRouter;