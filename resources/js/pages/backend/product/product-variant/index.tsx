import CreateVariant from '@/components/products/product-variant/create-variant';
import { DeleteVariant } from '@/components/products/product-variant/delete-variant';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppAdminLayout from '@/layouts/app-admin-layout';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/products';
import { Head, router } from '@inertiajs/react';
import { BetweenVerticalStart, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    product: Product;
};
const Index = ({ product }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Дашборд', href: '/admin/dashboard' },
        { title: 'Товары', href: '/admin/products' },
        { title: `Варианты для ${product.name}`, href: '/admin/products' },
    ];
    const [open, setOpen] = useState(false);
    const handleChangeStatus = (id: number, newStatus: boolean) => {
        router.patch(
            route('admin.product-variant.changeStatus', id),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Успешно обновлено.');
                },
                onError: () => {
                    toast.error('Ошибка обновление.');
                },
            },
        );
    };
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Варианты товара'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <PlusIcon />
                        Добавить вариант
                    </Button>
                    {open && <CreateVariant open={open} onOpenChange={setOpen} productId={product.id} />}
                </div>
                {product.variants?.length === 0 ? (
                    <span>Nothing</span>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Название</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead className="text-right">Действие</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.variants?.map((variant) => (
                                <TableRow key={variant.id}>
                                    <TableCell>{variant.id}</TableCell>
                                    <TableCell className="font-medium">{variant.name}</TableCell>
                                    <TableCell>
                                        <Switch
                                            className={'data-[state=checked]:bg-green-400'}
                                            checked={variant.status}
                                            onCheckedChange={(val) => handleChangeStatus(variant.id, val)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <TextLink
                                            className={'mr-1'}
                                            href={route('admin.product-variant-item.index', {
                                                variant: variant.id,
                                            })}
                                        >
                                            <Button variant={'ghost'}>
                                                <BetweenVerticalStart />
                                                Элементы варианта
                                            </Button>
                                        </TextLink>
                                        <DeleteVariant variantId={variant.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppAdminLayout>
    );
};

export default Index;
