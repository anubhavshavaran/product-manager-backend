import { Router } from 'express';
import { getAllProducts } from '../controllers/productsController.js';

const productRouter = Router();

productRouter
    .route("/")
    .get(getAllProducts)
    // .post()

productRouter.route("/:id").get();

export default productRouter;