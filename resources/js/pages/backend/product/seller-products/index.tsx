import ProductsDatatable from '@/components/products/products-datatable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Product } from '@/types/products';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Дашборд', href: '/admin/dashboard' },
    { title: 'Товары продавцов', href: '/admin/seller-products*' },
];

type ProductProps = {
    filters: { search: string; sortField: string; sortDirection: 'asc' | 'desc' };
    products: PaginatedResponse<Product>;
};

export default function Index({ filters, products }: ProductProps) {
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [sortField, setSortField] = useState(filters.sortField ?? 'id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(filters.sortDirection ?? 'desc');
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.seller-products.index'), { search, sortField, sortDirection }, { preserveScroll: true });
    };

    const handleSort = (field: string) => {
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newDirection);
        router.get(
            route('admin.seller-products.index'),
            {
                search,
                sortField: field,
                sortDirection: newDirection,
            },
            { preserveScroll: true },
        );
    };

    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Товары" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-4 flex justify-between">
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
                    <Link href={route('admin.product.create')}>
                        <Button variant="outline">
                            <PlusIcon className="mr-2" /> Добавить
                        </Button>
                    </Link>
                </div>

                <ProductsDatatable products={products} onSort={handleSort} sortField={sortField} sortDirection={sortDirection} />
            </div>
        </AppAdminLayout>
    );
}
