import CreateProductForm from '@/components/products/create-product-form';
import ProductsDatatable from '@/components/products/products-datatable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Product } from '@/types/products';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Товары',
        href: '/admin/child-category',
    },
];

type ProductProps = {
    categories: {
        id: number;
        name: string;
    }[];
    subCategories: {
        id: number;
        name: string;
        category_id: number;
    }[];
    childCategories: {
        id: number;
        name: string;
        category_id: number;
        sub_category_id: number;
    }[];
    brands: {
        id: number;
        name: string;
    }[];
    filters: { search: string };
    products: PaginatedResponse<Product>;
};

const Index = ({ categories, subCategories, childCategories, filters, products, brands }: ProductProps) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.product.index'), { search }, { preserveScroll: true, preserveState: true });
    };
    console.log(categories);
    console.log(subCategories);
    console.log(childCategories);
    console.log(childCategories);
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Товары'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <form onSubmit={handleSearch} className="relative mt-2 flex w-full max-w-sm items-center sm:flex-auto">
                            <Input
                                type={'text'}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                name={'search'}
                                placeholder={'Поиск...'}
                                id={'search'}
                            />
                            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
                                >
                                    <kbd>Enter</kbd>
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link href={route('admin.product.create')}>
                                <Button
                                    variant={'outline'}
                                >
                                    <PlusIcon />
                                    Добавить продукт
                                </Button>
                            </Link>
                            {open && (
                                <CreateProductForm
                                    open={open}
                                    onOpenChange={setOpen}
                                    categories={categories}
                                    subCategories={subCategories}
                                    childCategories={childCategories}
                                    brands={brands}
                                />
                            )}
                        </div>
                    </div>
                    <ProductsDatatable childCategories={childCategories} subCategory={subCategories} categories={categories} products={products} />
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
