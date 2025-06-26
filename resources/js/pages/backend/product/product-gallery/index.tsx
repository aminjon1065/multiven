import { DeleteImage } from '@/components/products/product-gallery/delete-image';
import ImageViewer from '@/components/products/product-gallery/image-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppAdminLayout from '@/layouts/app-admin-layout';
import { BreadcrumbItem } from '@/types';
import type { Product } from '@/types/products';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Props = { product: Product };

const Index = ({ product }: Props) => {
    const [images, setImages] = useState<File[]>([]);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Дашборд', href: '/admin/dashboard' },
        { title: 'Товары', href: '/admin/products' },
        { title: `Галерея для ${product.name}`, href: '/admin/products' },
    ];

    const { setData, post, processing, reset } = useForm<{
        product: number;
        image: File[];
    }>({
        product: product.id,
        image: [],
    });

    useEffect(() => {
        setData('image', images);
    }, [images, setData]);
    console.log('product', product);
    const handleUploadGallery: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.products-image-gallery.store', { product: product.id }), {
            onSuccess: () => {
                setImages([]);
                reset();
                toast.success('Success');
            },
            onError: () => {
                setImages([]);
                reset();
                toast.error('error');
            },
        });
    };
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Товары" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="w-full">
                    <Card>
                        <form onSubmit={handleUploadGallery}>
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
                                    required
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
                                <div className="mt-5 flex w-full justify-end">
                                    <Button type={'submit'} disabled={processing}>
                                        {processing ? 'Загрузка…' : 'Сохранить'}
                                    </Button>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
                <div className="w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Все фото товара</CardTitle>
                            <CardDescription>Уже имеющиеся фото товара</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">id</TableHead>
                                        <TableHead>Картинка</TableHead>
                                        <TableHead className="text-right">Действие</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {product.product_image_galleries?.map((img) => (
                                        <TableRow key={img.id}>
                                            <TableCell>{img.id}</TableCell>
                                            <TableCell className={'h-96 w-96'}>
                                                <img src={`/${img.image}`} alt={product.name} />
                                            </TableCell>
                                            <TableCell className={'text-right'}>
                                                <DeleteImage productImageGallery={img.id} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
