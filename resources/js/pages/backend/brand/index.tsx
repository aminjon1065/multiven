import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Brand } from '@/types/brand';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Head, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import BrandDatatable from '@/components/brand/brand-datatable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Бренд',
        href: '/admin/brand',
    },
];

type Props = {
    brands: PaginatedResponse<Brand>;
    filters: { search: string };
};
const Index = ({ brands, filters }: Props) => {
    console.log(brands);
    const [search, setSearch] = useState(filters.search ?? '');
    const [open, setOpen] = useState(false);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.brand.index'), { search }, { preserveScroll: true, preserveState: true });
    };
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Бренд'} />
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
                                <PlusIcon />
                                Добавить бренд
                            </Button>
                        </div>
                    </div>
                    <BrandDatatable />
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
