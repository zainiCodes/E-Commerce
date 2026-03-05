import { z } from "zod"
export const ProductSchema = z.object({
    name: z.string().min(1),
    category: z.enum(['male', 'female', 'kids']),
    description: z.string(),
    price: z.number().min(1, "Price must be greater than 0"),
    isFeatured: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    Image: z.string().optional()
});