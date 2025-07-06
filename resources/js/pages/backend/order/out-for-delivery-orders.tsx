import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Заказы в пути',
        href: '/admin/out-for-delivery-orders',
    },
];
const ShippedOrders = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Заказы в пути'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Заказы в пути</div>
        </AppAdminLayout>
    );
};

export default ShippedOrders;
