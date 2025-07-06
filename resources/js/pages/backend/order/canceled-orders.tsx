import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Отменённые заказы',
        href: '/admin/canceled-orders',
    },
];
const CanceledOrders = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Отменённые заказы'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Отменённые заказы</div>
        </AppAdminLayout>
    );
};

export default CanceledOrders;
