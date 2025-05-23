import AdminLayout from '@/layouts/app-admin-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import IconPicker from '@/components/icon-picker';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
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
    const [icon, setIcon] = useState('fa-user');

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Создать категорию" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                        <div className="p-6">
                            <h1 className="mb-4 text-2xl font-bold">Категория</h1>
                            <IconPicker value={icon} onChange={setIcon} />
                            <p className="mt-4">
                                Выбранная иконка: <code>{icon}</code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
