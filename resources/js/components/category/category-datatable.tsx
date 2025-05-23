import { UpdateCategory } from '@/components/category/update-category';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Category } from '@/types/category';
import { PaginatedResponse } from '@/types/paginateResponse';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
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
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th className="py-3 text-left text-sm font-semibold text-gray-900">Название</th>
                        <th className="py-3 text-left text-sm font-semibold text-gray-900">Slug</th>
                        <th className="py-3 text-left text-sm font-semibold text-gray-900">Иконка</th>
                        <th className="py-3 text-left text-sm font-semibold text-gray-900">Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {category.data.map((item) => (
                        <tr key={item.id}>
                            <td className="py-4 text-sm text-gray-900">{item.name}</td>
                            <td className="py-4 text-sm text-gray-500">{item.slug}</td>
                            <td className="py-4 text-sm text-gray-500">
                                <i className={`fa-solid ${item.icon}`}></i>
                            </td>
                            <td className="py-4 text-sm text-gray-500">
                                <Switch
                                    className={'data-[state=checked]:bg-green-400'}
                                    checked={item.status}
                                    onCheckedChange={(val) => changeStatus(item.id, val)}
                                />
                            </td>
                            <td className="space-x-2 py-4 text-right text-sm">
                                <Button
                                    variant={'link'}
                                    onClick={() => {
                                        setSelectedCategory(item);
                                        setOpen(true);
                                    }}
                                >
                                    Редактировать
                                </Button>
                                <Button variant={'ghost'} className={'hover:text-red-500'}>
                                    <Trash2Icon />
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <UpdateCategory open={open} onOpenChange={setOpen} item={selectedCategory} />
            {/* Пагинация */}
            <div className="flex justify-end">
                <Pagination pagination={category} />
            </div>
        </div>
    );
}
