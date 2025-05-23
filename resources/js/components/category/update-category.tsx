import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Category } from '@/types/category';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function UpdateCategory({ open, onOpenChange, item }: { open: boolean; onOpenChange: (open: boolean) => void; item: Category | null }) {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('');

    // ⬇️ Когда item меняется — обновляем поля
    useEffect(() => {
        if (item) {
            setName(item.name);
            setIcon(item.icon);
        }
    }, [item]);

    const handleSubmit = () => {
        if (!item) return;
        router.patch(
            route('admin.category.update', item.id),
            { name, icon, status: item.status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Категория обновлена');
                    onOpenChange(false);
                },
                onError: () => toast.error('Ошибка при обновлении'),
            },
        );
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать категорию</DialogTitle>
                    <DialogDescription>Здесь вы можете изменить название и иконку категории.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Название" />
                    <div className="flex items-center justify-between space-x-2">
                        <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="Иконка" /> <i className={`fa-solid ${icon}`}></i>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
