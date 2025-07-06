import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Доставленные заказы',
        href: '/admin/delivered-orders',
    },
];
const ShippedOrders = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Доставленные заказы'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Доставленные заказы</div>
        </AppAdminLayout>
    );
};

export default ShippedOrders;
