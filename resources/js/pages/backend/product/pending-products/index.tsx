import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Дашборд', href: '/admin/dashboard' },
    { title: 'Товары ожидают', href: '/admin/products' },
];
const Index = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Товары продавцов" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, eius.
            </div>
        </AppAdminLayout>
    );
};

export default Index;
