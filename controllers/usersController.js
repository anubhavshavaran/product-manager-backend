import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

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

const signinUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
        return res.status(401).json({
            status: 'failure',
            message: 'Invalid email or password!'
        });
    }

    sendToken(res, user, 200);
}

const signupUser = async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (user) {
        return res.status(400).json({
            status: 'failure',
            message: 'A user already exists with this email'
        });
    }

    const encryptedPass = await bcryptjs.hash(password, 12);
    const newUser = await prisma.user.create({
        data: {
            fullname,
            email,
            password: encryptedPass
        }
    });
    
    sendToken(res, newUser, 201)
}

export { signinUser, signupUser };