import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppAdminLayout from '@/layouts/app-admin-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { route } from 'ziggy-js';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import CreateVariantItem from '@/components/products/product-variant/product-variant-item/create-variant-item';

type Props = {
    items: {
        id:number;
        name:string;
        product_id:number;
        product_variant_items: {
            id: number;
            name: string;
            price: number;
            is_default: boolean;
            status: boolean;
            product_variant_id: number
        }[]
    };
};

const Index = ({ items }: Props) => {
    const [open, setOpen] = useState(false);
    console.log(items);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Дашборд', href: '/admin/dashboard' },
        { title: 'Товары', href: '/admin/products' },
        { title: `Варианты`, href: `/admin/product-variant?product=${items.product_id}` },
        { title: `Элементы варианта`, href: '/admin/products/variants' },
    ];
    const changeStatus = (id: number, newStatus: boolean) => {
        router.patch(
            route('admin.product-variant-item.changeStatus', {variantItem:id}),
            {
                status: newStatus,
            },
            {
                onSuccess: () => {
                    toast.success('Success');
                },
                onError:()=>{
                    toast.error("Error")
                }
            },
        );
    };

    const changeIsDefault = (id: number, newDefault: boolean) => {
        router.patch(
            route('admin.product-variant-item.change-is-default', {variantItem:id}),
            {
                is_default: newDefault,
            },
            {
                onSuccess: () => {
                    toast.success('Success');
                },
                onError:()=>{
                    toast.error("Error")
                }
            },
        );
    };

    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Элементы варианта'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                        variant={'outline'}
                    >
                        <PlusIcon />
                        Добавить бренд
                    </Button>
                    {open &&  <CreateVariantItem open={open} onOpenChange={setOpen} product_variant_id={items.id} />}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>Цена</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>По умолчание</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.product_variant_items.length > 0 ? items.product_variant_items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="font-medium">{item.price}</TableCell>
                                <TableCell>
                                    <Switch
                                        className={'data-[state=checked]:bg-green-400'}
                                        checked={item.status}
                                        onCheckedChange={(val) => changeStatus(item.id, val)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        className={'data-[state=checked]:bg-green-400'}
                                        checked={item.is_default}
                                        onCheckedChange={(val) => changeIsDefault(item.id, val)}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    Delete
                                </TableCell>
                            </TableRow>
                        )) : <span>Nothing</span>}
                    </TableBody>
                </Table>
            </div>
        </AppAdminLayout>
    );
};

export default Index;
