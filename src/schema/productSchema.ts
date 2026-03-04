import z from "zod"
export const ProductSchema = z.object({
    name: z.string().min(1),
    category: z.enum(['male', 'female', 'kids']),
    description: z.string().optional(),
    price: z.number().min(1),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    Image: z.file().mime(["image/png", "image/jpeg"]).nullable()
});