'use client'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { client } from '@/server/orpc/utils/orpc';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ShoppingBag, Eye } from 'lucide-react';
import Image from 'next/image';

function ProductCardItem({ item }: { item: any }) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <Card className="group overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 bg-card">
            <div className="relative h-[280px] w-full overflow-hidden bg-muted">
                {isImageLoading && <Skeleton className="absolute inset-0 z-10 h-full w-full rounded-none" />}
                <Image
                    src={item.url}
                    alt={item.product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover w-full h-full transition-all duration-700 ease-in-out group-hover:scale-105 ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                    onLoad={() => setIsImageLoading(false)}
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
                    <Badge className="capitalize px-3 py-1 font-semibold backdrop-blur-md bg-background/80 text-foreground border-none" variant="secondary">
                        {item.product.category}
                    </Badge>
                    {item.product.isFeatured && (
                        <Badge className="bg-primary/90 text-primary-foreground px-3 py-1 backdrop-blur-md border-none">
                            Featured
                        </Badge>
                    )}
                </div>
            </div>

            <CardHeader className="flex-1 pb-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1.5 w-full">
                        <div className="flex items-center gap-2 mt-1">
                            {item.product.discountPrice ? (
                                <>
                                    <span className="text-2xl font-bold tracking-tight">${item.product.discountPrice}</span>
                                    <span className="text-muted-foreground line-through text-sm">${item.product.price}</span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold tracking-tight">${item.product.price}</span>
                            )}
                        </div>
                        <CardTitle className="line-clamp-1 text-xl tracking-tight">
                            {item.product.name}
                        </CardTitle>
                    </div>
                </div>
                <CardDescription className="line-clamp-2 mt-3 text-sm leading-relaxed">
                    {item.product.description}
                </CardDescription>
            </CardHeader>

            <CardFooter className="pt-0 mt-auto">
                <Button className="w-full font-medium shadow-sm hover:shadow-md transition-all gap-2" size="lg">
                    <Eye className="h-4 w-4" />
                    View Product
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function ProductList() {
    const allProducts = useQuery(client.product.getAllProducts.queryOptions())

    if (allProducts.isPending || allProducts.isLoading) {
        return (
            <div className="w-full mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="overflow-hidden flex flex-col items-center">
                            <Skeleton className="h-64 w-full rounded-none" />
                            <CardHeader className="w-full">
                                <Skeleton className="h-6 w-1/2 mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <Skeleton className="h-8 w-1/4" />
                            </CardHeader>
                            <CardFooter className="w-full mt-auto">
                                <Skeleton className="h-10 w-full" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (allProducts.isError) {
        return (
            <div className="w-full mx-auto py-20 flex justify-center items-center">
                <p className="text-destructive font-semibold text-lg">Failed to load products. Please try again later.</p>
            </div>
        )
    }

    const productsData = allProducts.data || [];

    if (productsData.length === 0) {
        return (
            <div className="w-full mx-auto py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No products found</h3>
                <p className="text-muted-foreground mt-2">Check back later for new arrivals.</p>
            </div>
        )
    }

    return (
        <div className="w-full mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsData.map((item: any) => (
                    <ProductCardItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
