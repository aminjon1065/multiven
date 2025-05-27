import { CategoryDeleteDialog } from '@/components/category/delete-category-dialog';
import { UpdateCategory } from '@/components/category/update-category';
import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Category } from '@/types/category';
import { PaginatedResponse } from '@/types/paginateResponse';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    category: PaginatedResponse<Category>;
};

export default function CategoryDatatable({ category }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
            <Table>
                <TableCaption>
                    <div className="flex justify-end">
                        <PaginationBar pagination={category} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">ID</TableHead>
                        <TableHead className="w-[100px]">Название</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Иконка</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {category.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{item.slug}</TableCell>
                            <TableCell>
                                {' '}
                                <i className={`fa-solid ${item.icon}`}></i>
                            </TableCell>
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
                                <CategoryDeleteDialog category={item} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <UpdateCategory open={open} onOpenChange={setOpen} item={selectedCategory} />
            {/* Пагинация */}
        </div>
    );
}
