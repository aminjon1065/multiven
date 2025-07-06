import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Отправленные заказы',
        href: '/admin/shipped-orders',
    },
];
const ShippedOrders = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Отправленные заказы'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Отправленные заказы</div>
        </AppAdminLayout>
    );
};

export default ShippedOrders;
