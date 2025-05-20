import { CategoryDataTable } from '@/components/category/cteagory-datatable';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { type Category } from '@/types/category';
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
const Index = ({ category }: { category: Category }) => {
    // const { current_page, first_page_url, last_page, last_page_url, next_page_url, path, per_page, prev_page_url, to, total } = category;
    // console.log(current_page);
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CategoryDataTable />
            </div>
        </AppAdminLayout>
    );
};

export default Index;
