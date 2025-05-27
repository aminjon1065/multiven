import CreateCategoryForm from '@/components/category/create-category-form';
import AdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Категории',
        href: '/admin/category',
    },
    {
        title: 'Создать',
        href: '/admin/category/create',
    },
];
export default function Create() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Создать категорию" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <CreateCategoryForm />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
