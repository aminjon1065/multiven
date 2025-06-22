import React from 'react';
import AppAdminLayout from '@/layouts/app-admin-layout';
import { BreadcrumbItem } from '@/types';
import type { Product } from '@/types/products';
import { Head } from '@inertiajs/react';
import { Card, CardAction,CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Index = ({ product }:{product:Product}) => {
    console.log("product", product);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Дашборд', href: '/admin/dashboard' },
        { title: 'Товары', href: '/admin/products' },
        { title: `Галерея для ${product.name}`, href: '/admin/products' },
    ];

    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Товары" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Загрузка фото</CardTitle>
                            <CardDescription>Выберите несколько фото для загрузки(мультизагрузка)</CardDescription>
                            {/*<CardAction>Card Action</CardAction>*/}
                        </CardHeader>
                        <CardContent>
                            <Input
                                type={"file"}
                                accept={"image/*"}
                                multiple
                            />
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
