import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Дочерняя категория',
        href: '/admin/child-category',
    },
];
const Index = () => {
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Дочерняя категория'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, quasi.
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
