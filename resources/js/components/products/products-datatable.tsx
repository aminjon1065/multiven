import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Product } from '@/types/products';
import { useState } from 'react';

type Props = {
    products: PaginatedResponse<Product>;
    childCategories: {
        id: number;
        name: string;
        category_id: number;
        sub_category_id: number;
    }[];
    subCategory: { id: number; name: string; category_id: number }[];
    categories: { id: number; name: string }[];
};

export default function ProductsDatatable({ childCategories, subCategory, categories, products }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [open, setOpen] = useState(false);
    const changeStatus = (id: number, newStatus: boolean) => {
        // router.patch(
        //     route('admin.product.changeStatus', id),
        //     { status: newStatus },
        //     {
        //         preserveScroll: true,
        //         onSuccess: () => {
        //             toast.success('Успешно обновлено.');
        //         },
        //         onError: () => {
        //             toast.error('Ошибка обновление.');
        //         },
        //     },
        // );
    };

    return (
        <div className="mt-8">
            {products.data.length > 0 ? (
                <Table>
                    <TableCaption>
                        <div className="flex justify-end">
                            <PaginationBar pagination={products} />
                        </div>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead className="w-[70px]">Картина</TableHead>
                            <TableHead>Имя</TableHead>
                            <TableHead>Цена</TableHead>
                            <TableHead className="w-[100px]">Кол-во</TableHead>
                            <TableHead>Код</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>
                                    <img src={`/${item.thumb_image}`} alt={item.name} />
                                </TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.price ?? '-'}</TableCell>
                                <TableCell>
                                    <Input type={'number'} value={item.qty} />
                                </TableCell>
                                <TableCell>{item.code ?? '-'}</TableCell>
                                <TableCell>
                                    {' '}
                                    <Switch
                                        className={'data-[state=checked]:bg-green-400'}
                                        checked={item.status}
                                        onCheckedChange={(val) => changeStatus(item.id, val)}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        className={'hover:text-sky-500'}
                                        variant={'ghost'}
                                        onClick={() => {
                                            setSelectedProduct(item);
                                            setOpen(true);
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                    {/*<SubCategoryDeleteDialog SubCategory={item} />*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <span>Nothing</span>
            )}

            {/*<UpdateChildCategory open={open} onOpenChange={setOpen} item={selectedCategory} categories={categories} subCategories={subCategory} />*/}
            {/* Пагинация */}
        </div>
    );
}
