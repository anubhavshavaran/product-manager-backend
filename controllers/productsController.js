import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getAllProducts = async (req, res, next) => {
    const products = await prisma.product.findMany();

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
}
export { getAllProducts };