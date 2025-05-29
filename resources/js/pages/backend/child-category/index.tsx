import ChildCategoryDatatable from '@/components/child-category/child-category-datatable';
import CreateChildCategoryForm from '@/components/child-category/create-child-category-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { ChildCategory } from '@/types/child-category';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Дочерняя категория',
        href: '/admin/child-category',
    },
];

type Props = {
    categories: {
        id: number;
        name: string;
    }[];
    subCategories: {
        id: number;
        name: string;
    }[];
    filters: { search: string };
    childCategories: PaginatedResponse<ChildCategory>;
};
const Index = ({ categories, subCategories, filters, childCategories }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.child-category.index'), { search }, { preserveScroll: true, preserveState: true });
    };
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Дочерняя категория'} />
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
                            <CreateChildCategoryForm open={open} onOpenChange={setOpen} categories={categories} subCategories={subCategories} />
                        </div>
                    </div>
                    <ChildCategoryDatatable childCategories={childCategories} subCategory={subCategories} categories={categories} />
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
