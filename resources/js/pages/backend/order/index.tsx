import React from 'react';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Заказы',
        href: '/admin/orders',
    },
];
const Index = () => {
    return (
        <AppAdminLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title={"Заказы"} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Все заказы
            </div>
        </AppAdminLayout>
    );
};

export default Index;
