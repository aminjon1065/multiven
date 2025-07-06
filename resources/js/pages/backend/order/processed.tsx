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
        title: 'Обработанные заказы',
        href: '/admin/pending-orders',
    },
];
const ProcessedOrders = () => {
    return (
        <AppAdminLayout
            breadcrumbs={breadcrumbs}
        >
            <Head title={"Обработанные заказы"} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Все Обработанные заказы
            </div>
        </AppAdminLayout>
    );
};

export default ProcessedOrders;
