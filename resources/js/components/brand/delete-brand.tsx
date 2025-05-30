import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Brand } from '@/types/brand';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    brand: Brand;
};

export function DeleteBrand({ brand }: Props) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        router.delete(route('admin.brand.destroy', brand.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Категория успешно удалена.');
                setOpen(false);
            },
            onError: () => {
                toast.error('Ошибка при удалении.');
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" className="hover:text-red-500" onClick={() => setOpen(true)}>
                <Trash2Icon className="mr-1" />
                Удалить
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Удалить бренд?</DialogTitle>
                    <DialogDescription>Это действие необратимо.</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive" onClick={handleDelete}>
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
