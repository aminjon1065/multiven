import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaginatedResponse } from '@/types/paginateResponse';
import { SubCategory } from '@/types/sub-category';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    subCategory: PaginatedResponse<SubCategory>;
};

export default function SubCategoryDatatable({ subCategory }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<SubCategory | null>(null);
    const [open, setOpen] = useState(false);
    const changeStatus = (id: number, newStatus: boolean) => {
        router.patch(
            route('admin.category.changeStatus', id),
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
            {subCategory.data.length > 0 ? (
                <Table>
                    <TableCaption>
                        <div className="flex justify-end">
                            <PaginationBar pagination={subCategory} />
                        </div>
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">ID</TableHead>
                            <TableHead className="w-[100px]">Подкатегория</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subCategory.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
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
                                    {/*<CategoryDeleteDialog category={item} />*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <span>Nothing</span>
            )}

            {/*<UpdateCategory open={open} onOpenChange={setOpen} item={selectedCategory} />*/}
            {/* Пагинация */}
        </div>
    );
}
