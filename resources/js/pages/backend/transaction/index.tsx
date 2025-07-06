import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Транзакции',
        href: '/admin/transactions',
    },
];
const Transaction = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Транзакции'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Транзакции</div>
        </AppAdminLayout>
    );
};

export default Transaction;
