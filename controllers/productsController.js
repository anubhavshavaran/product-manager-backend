import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';
import { addMonthsToDate } from './../utils/date.js';
import catchAsync from '../utils/catchAsync.js';

const prisma = new PrismaClient();

const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await prisma.product.findMany();

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});

const createProduct = catchAsync(async (req, res, next) => {
    const { productName,
        brand,
        type,
        warrantyPeriod,
        startDate,
        price,
        serialNumber,
        purchaseDate,
        userId
    } = req.body;

    const slug = slugify(productName.toLowerCase());
    const endDate = addMonthsToDate(startDate, warrantyPeriod);

    const product = await prisma.product.create({
        data: {
            slug,
            productName,
            brand,
            type,
            warrantyPeriod,
            startDate,
            endDate,
            price,
            serialNumber,
            purchaseDate,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            product
        }
    });
});

const getProduct = catchAsync(async (req, res, next) => {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
        where: {
            slug
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

const getUserProducts = catchAsync(async (req, res, next) => {
    const products = await prisma.product.findMany({
        where: {
            userId: req.user.id
        }
    });

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});

const deleteProduct = catchAsync(async (req, res, next) => {
    await prisma.product.delete({
        where: {
            slug: req.params.slug
        }
    });

    res.status(204).json({
        status: 'success',
    });
});

export { getAllProducts, createProduct, getProduct, getUserProducts, deleteProduct };