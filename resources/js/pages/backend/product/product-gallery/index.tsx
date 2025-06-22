import ImageViewer from '@/components/products/product-galley/image-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppAdminLayout from '@/layouts/app-admin-layout';
import { BreadcrumbItem } from '@/types';
import type { Product } from '@/types/products';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

type Props = { product: Product };

const Index = ({ product }: Props) => {
    const [images, setImages] = useState<File[]>([]);
    console.log('product', product);
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
                                type="file"
                                accept={'image/apng, image/avif, image/jpeg, image/png, image/svg+xml, image/webp'}
                                multiple
                                onChange={(e) => {
                                    if (!e.target.files) return;
                                    const filesArray = Array.from(e.target.files);
                                    setImages((prev) => [...prev, ...filesArray]); // поддержка мультизагрузки
                                }}
                            />
                        </CardContent>
                        <CardFooter className={'flex flex-col'}>
                            <div className="w-full">
                                <ImageViewer
                                    images={images}
                                    onRemove={(index) => {
                                        setImages((prev) => prev.filter((_, i) => i !== index));
                                    }}
                                />
                            </div>
                            <div className="flex w-full justify-end">
                                <Button>Сохранить</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Все фото товара</CardTitle>
                            <CardDescription>Уже имеющиеся фото товара</CardDescription>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
