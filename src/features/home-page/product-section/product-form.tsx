'use client'
import { Button } from "@/shared/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"

import {
    Controller,
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    z
} from "zod"
import {
    toast
} from "sonner"

import {
    Textarea
} from "@/shared/components/ui/textarea"
import {
    Switch
} from "@/shared/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/shared/components/ui/select"
import { ProductSchema } from "@/schema/productSchema"
import { client } from "@/server/orpc/utils/orpc"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { Spinner } from "@/shared/components/ui/spinner"

export default function ProductForm() {
    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            category: "male",
            description: "",
            price: 1,
            isFeatured: false,
            isPublished: false,
            Image: '',
        }
    })
    const qc = useQueryClient()
    const addProduct = useMutation(client.product.AddProduct.mutationOptions({
        onSuccess: () => {
            toast.success("Product added successfully")
            qc.invalidateQueries({
                queryKey: client.product.getAllProducts.key()
            })
            form.reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))
    function onSubmit(values: z.infer<typeof ProductSchema>) {
        addProduct.mutate(values)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl max-h-[85vh] overflow-hidden p-0">
                <DialogHeader className="px-6 pt-5">
                    <DialogTitle>Add product</DialogTitle>
                    <DialogDescription>
                        Add the product that you want to add in this list
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                    <FieldGroup>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="kids">Kids</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription>Select the category of the product</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="description"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="description">Description</FieldLabel>
                                        <Textarea
                                            {...field}
                                            id="description"
                                        />
                                        <FieldDescription>Enter the product description</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="price">Price</FieldLabel>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={field.value === 0 ? "" : field.value}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                        <FieldDescription>Enter the price here</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="isFeatured"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FieldLabel className="text-base">Featured</FieldLabel>
                                            <FieldDescription>Feature this product</FieldDescription>
                                        </div>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="isPublished"
                                control={form.control}
                                render={({ field }) => (
                                    <Field className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FieldLabel className="text-base">Publish</FieldLabel>
                                            <FieldDescription>Publish this product</FieldDescription>
                                        </div>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </Field>
                                )}
                            />
                            <Controller
                                name="Image"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="Image">Upload Product Image</FieldLabel>
                                        <Input
                                            id="Image"
                                            type="file"
                                            accept="image/png,image/jpeg"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (!file) return

                                                const reader = new FileReader()
                                                reader.readAsDataURL(file)
                                                reader.onload = () => {
                                                    field.onChange(reader.result as string) // base64
                                                }
                                            }}
                                        />
                                        <FieldDescription>Select a file to upload.</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Button type="submit" disabled={addProduct.isPending}>
                                {addProduct.isPending ?
                                    <Button>
                                        <Spinner /> Adding product
                                    </Button> : "Add Product"}
                            </Button>
                        </form>
                    </FieldGroup>
                </div>
            </DialogContent>

        </Dialog>
    )
}
