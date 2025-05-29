import { SelectCategory } from '@/components/select-category';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChildCategory } from '@/types/child-category';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type ChildCategoryUpdated = {
    category_id: string;
    sub_category_id: string;
    name: string;
    status: boolean;
};

export function UpdateChildCategory({
    open,
    onOpenChange,
    item,
    categories,
    subCategories,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: ChildCategory | null;
    categories: { id: number; name: string }[];
    subCategories: { id: number; name: string; category_id: number }[];
}) {
    const { data, setData, patch, reset, processing } = useForm<ChildCategoryUpdated>({
        category_id: '',
        sub_category_id: '',
        name: '',
        status: true,
    });

    useEffect(() => {
        if (item) {
            setData({
                name: item.name,
                category_id: String(item.category_id),
                sub_category_id: String(item.sub_category_id),
                status: item.status,
            });
        } else {
            reset();
        }
    }, [item, setData, reset]);

    const handleSubmit = () => {
        if (!item) return;
        patch(route('admin.child-category.update', item.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Подкатегория обновлена');
                onOpenChange(false);
            },
            onError: () => toast.error('Ошибка при обновлении'),
        });
    };
    const filteredSubCategories = subCategories.filter((sub) => sub.category_id === Number(data.category_id));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать дочернюю категорию</DialogTitle>
                    <DialogDescription>Измените название, категорию и подкатегорию.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    <SelectCategory categories={categories} selectedId={data.category_id} onChange={(val) => setData('category_id', val)} />
                    <SelectCategory
                        disabled={!data.category_id}
                        categories={filteredSubCategories}
                        selectedId={data.sub_category_id}
                        onChange={(val) => setData('sub_category_id', val)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} disabled={processing || !data.category_id}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
