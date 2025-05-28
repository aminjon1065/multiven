import CreateSubCategoryForm from '@/components/sub-category/create-sub-category-form';
import SubCategoryDatatable from '@/components/sub-category/sub-category-datatable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/paginateResponse';
import { SubCategory } from '@/types/sub-category';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Подкатегории',
        href: '/admin/sub-category',
    },
];
const Index = ({
    subCategory,
    filters,
    categories,
}: {
    subCategory: PaginatedResponse<SubCategory>;
    filters: { search: string };
    categories: { id: number; name: string }[];
}) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.sub-category.index'), { search }, { preserveScroll: true, preserveState: true });
    };
    console.log(subCategory);
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Подкатегории" />
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
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                variant={'outline'}
                            >
                                Добавить подкатегория
                            </Button>
                            <CreateSubCategoryForm open={open} onOpenChange={setOpen} categories={categories} />
                        </div>
                    </div>
                    <SubCategoryDatatable subCategory={subCategory} categories={categories} />
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
