import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Выгруженные товары',
        href: '/admin/pending-orders',
    },
];
const DroppedOffOrders = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Выгруженные товары'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Все Выгруженные товары</div>
        </AppAdminLayout>
    );
};

export default DroppedOffOrders;
