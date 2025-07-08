import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Профиль продавца',
        href: '/admin/vendor-profile',
    },
];
const Index = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Профиль продавца'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">Профиль продавца</div>
        </AppAdminLayout>
    );
};

export default Index;
