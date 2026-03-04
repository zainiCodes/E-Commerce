import ProductForm from "./product-form";

export default function ProductList() {
    return (
        <div className="w-full min-h-screen p-6">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Product List
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage and organize your store products
                    </p>
                </div>
                <div>
                    <ProductForm />
                </div>

            </div>

        </div>
    );
}
