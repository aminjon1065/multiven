import CategoryDatatable from '@/components/category/category-datatable';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { PropsWithDataPaginate } from '@/types/propsWithDataPaginate';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'User',
        href: '/user',
    },
];
const Index = ({ category }: { category: PropsWithDataPaginate }) => {
    // const { current_page, first_page_url, last_page, last_page_url, next_page_url, path, per_page, prev_page_url, to, total } = category;
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CategoryDatatable categories={category.data} />
            </div>
        </AppAdminLayout>
    );
};

export default Index;
