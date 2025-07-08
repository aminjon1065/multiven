import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Настройка платежей',
        href: '/admin/payment-settings',
    },
];
const Index = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Настройка платежей'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Настройка платежей</div>
        </AppAdminLayout>
    );
};

export default Index;
