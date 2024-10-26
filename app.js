import express from 'express';
import productRouter from './routes/productsRoute.js';


const app = express();

app.use(express.json());

app.use("/products", productRouter);

app.get("/helloworld", (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: "Hello World!"
    });
});

export default app;