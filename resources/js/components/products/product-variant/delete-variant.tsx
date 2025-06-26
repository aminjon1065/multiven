import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    variantId: number;
};

export function DeleteVariant({ variantId }: Props) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        router.delete(route('admin.product-variant.destroy', variantId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Вариант успешно удалён.');
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="destructive" onClick={() => setOpen(true)}>
                        <Trash2Icon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Удалить</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Удалить вариант?</DialogTitle>
                    <DialogDescription>Все связанные элементы будут удалены. Это действие необратимо.</DialogDescription>
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
