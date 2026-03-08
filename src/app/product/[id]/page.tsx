import { orpc } from "@/server/orpc/utils/orpc.server"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import { ShoppingCart, Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function Product({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params
    const data = await orpc.product.getProductById({ id })

    if (!data) {
        return notFound()
    }

    const mainImage = data.images[0]?.url || "/placeholder-image.jpg"

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to products
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Side - Image Gallery */}
                <div className="flex flex-col space-y-4">
                    <Card className="overflow-hidden border-none shadow-md bg-muted/30">
                        <div className="relative aspect-square w-full">
                            <Image
                                src={mainImage}
                                alt={data.name}
                                fill
                                className="object-cover object-center"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </Card>

                    {data.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {data.images.map((img, idx) => (
                                <button key={img.id} className={`relative aspect-square overflow-hidden rounded-md border-2 ${idx === 0 ? 'border-primary' : 'border-transparent hover:border-primary/50'} transition-all`}>
                                    <Image
                                        src={img.url}
                                        alt={`${data.name} thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side - Product Details */}
                <div className="flex flex-col space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="capitalize px-3 py-1 font-medium bg-secondary text-secondary-foreground">
                                {data.category}
                            </Badge>
                            {data.isFeatured && (
                                <Badge className="bg-primary/90 text-primary-foreground px-3 py-1">
                                    Featured
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {data.name}
                        </h1>

                        {/* <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                            <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <span>(128 reviews)</span>
                        </div> */}
                    </div>

                    <div className="flex items-baseline space-x-3">
                        {data.discountPrice ? (
                            <>
                                <span className="text-4xl font-bold tracking-tight text-foreground">${data.discountPrice}</span>
                                <span className="text-xl text-muted-foreground line-through decoration-muted-foreground/50">${data.price}</span>
                            </>
                        ) : (
                            <span className="text-4xl font-bold tracking-tight text-foreground">${data.price}</span>
                        )}
                    </div>

                    <div className="prose prose-sm sm:prose-base dark:prose-invert text-muted-foreground">
                        <p className="leading-relaxed">
                            {data.description}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-border space-y-4">
                        <div className="flex items-center space-x-4">
                            <Button size="lg" className="flex-1 text-base font-semibold h-12 gap-2 shadow-sm hover:shadow-md transition-all">
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
                            <Truck className="h-5 w-5 text-primary" />
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span>2 year extended warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

