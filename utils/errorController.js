import AppError from './appError.js';
import { Prisma } from '@prisma/client';

const handleDuplicateRowError = () => new AppError(400, "Duplicate data");
const handleRecordNotfound = () => new AppError(404, "No data found");

const handleJWTTokenError = () => new AppError(401, 'Invalid token. Login again!');
const handleJWTTokenExpiration = () => new AppError(401, 'Your token has been expired. Login again!');

const sendDevErrors = async (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendProdError = async (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: "Something went wrong."
        });
    }
}

const errorController = async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === "development") {
        sendDevErrors(res, err);
    } else {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            switch (err.code) {
                case 'P2002':
                    err = handleDuplicateRowError();
                    break;
                case 'P2025':
                    err = handleRecordNotfound();
                    break;
            }
        }

        if (err.name === 'JsonWebTokenError') {
            err = handleJWTTokenError();
        }
        
        if (err.name === "TokenExpiredError") {
            err = handleJWTTokenExpiration();
        }

        sendProdError(res, err);
    }

    next();
}

export default errorController;