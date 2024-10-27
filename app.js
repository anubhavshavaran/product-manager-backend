import express from 'express';
import productRouter from './routes/productsRoute.js';
import usersRouter from './routes/usersRoute.js';
import errorController from './utils/errorController.js';
import AppError from './utils/appError.js';

const app = express();

app.use(express.json());


app.use("/products", productRouter);
app.use("/users", usersRouter);

app.all("*", async (req, res, next) => {
    next(new AppError(404, "Not found!"));
});

app.use(errorController);

export default app;