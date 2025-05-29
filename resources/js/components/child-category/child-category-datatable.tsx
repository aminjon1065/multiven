import { UpdateChildCategory } from '@/components/child-category/updated-child-category';
import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChildCategory } from '@/types/child-category';
import { PaginatedResponse } from '@/types/paginateResponse';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    childCategories: PaginatedResponse<ChildCategory>;
    subCategory: { id: number; name: string; category_id: number }[];
    categories: { id: number; name: string }[];
};

export default function ChildCategoryDatatable({ childCategories, subCategory, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<ChildCategory | null>(null);
    const [open, setOpen] = useState(false);
    const changeStatus = (id: number, newStatus: boolean) => {
        router.patch(
            route('admin.child-category.changeStatus', id),
            { status: newStatus },
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
        <div className="mt-8">
            {childCategories.data.length > 0 ? (
                <Table>
                    <TableCaption>
                        <div className="flex justify-end">
                            <PaginationBar pagination={childCategories} />
                        </div>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead>Дочерняя категория</TableHead>
                            <TableHead>Подкатегория</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {childCategories.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="font-medium">{item.sub_category?.name}</TableCell>
                                <TableCell>{item.category?.name ?? '-'}</TableCell>
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
                                            setSelectedCategory(item);
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

            <UpdateChildCategory open={open} onOpenChange={setOpen} item={selectedCategory} categories={categories} subCategories={subCategory} />
            {/* Пагинация */}
        </div>
    );
}
