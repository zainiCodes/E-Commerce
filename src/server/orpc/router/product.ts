import * as z from 'zod'
import { protectedProcedure } from '../utils/procedures';
import { ProductSchema } from '@/schema/productSchema';
import cloudinary from '@/lib/cloudinary'; // 👈 Import cloudinary

const AddProduct = protectedProcedure
    .input(ProductSchema)
    .handler(async ({ input, context }) => {
        const { name, category, description, price, isFeatured, isPublished, Image } = input
        const product = await context.prisma.product.create({
            data: {
                name,
                category,
                description,
                price,
                isFeatured,
                isPublished,
            }
        })

        if (Image) {
            const result = await cloudinary.uploader.upload(Image, {
                folder: "products",
            });

            await context.prisma.productImage.create({
                data: {
                    url: result.secure_url,
                    publicId: result.public_id,
                    productId: product.id,
                },
            });
        }

        return product
    })

export const ProductRouter = {
    AddProduct,
};
