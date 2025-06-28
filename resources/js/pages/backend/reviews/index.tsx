import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Дашборд', href: '/admin/dashboard' },
    { title: 'Товары', href: '/admin/products' },
];

const Index = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Отзывы" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Отзывы - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, minus?
            </div>
        </AppAdminLayout>
    );
};

export default Index;
