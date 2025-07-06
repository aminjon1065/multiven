import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Распродажа',
        href: '/admin/flash-sale',
    },
];
const FlashSale = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Распродажа'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Распродажа</div>
        </AppAdminLayout>
    );
};

export default FlashSale;
