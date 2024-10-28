import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from "util";
import catchAsync from "../utils/catchAsync.js";
import AppError from './../utils/appError.js';

const prisma = new PrismaClient();

const signToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
}

const sendToken = (res, user, successCode) => {
    const token = signToken(user.id);
    res.status(successCode).json({
        status: 'success',
        data: {
            token,
            user
        }
    });
}

const signinUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user || !(await bcryptjs.compare(password, user.password))) return next(new AppError(401, 'Invalid email or password!'));

    sendToken(res, user, 200);
});

const signupUser = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) return next(new AppError(400, 'A user already exists with this email'));

    const encryptedPass = await bcryptjs.hash(password, 12);
    const newUser = await prisma.user.create({
        data: {
            fullname,
            email,
            password: encryptedPass
        }
    });

    sendToken(res, newUser, 201)
});

const protect = catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    let token;

    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1];
    }

    if (!token) return next(new AppError(401, 'Unauthorized Access'));

    const decoded =  await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });

    if (!user) return next(new AppError(401, 'This user no longer exists'));

    req.user = user;
    next();
});

export { signinUser, signupUser, protect };