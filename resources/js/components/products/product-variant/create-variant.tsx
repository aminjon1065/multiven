import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

type CreateVariant = {
    name: string;
    product_id:number;
    status: boolean;
};
const CreateVariant = ({ open, onOpenChange, productId }: {
    open: boolean;
    onOpenChange: (open: boolean) => void,
    productId: number
}) => {
    const { data, setData, post, processing, reset } = useForm<Required<CreateVariant>>({
        name: '',
        product_id: productId,
        status: true
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.product-variant.store'), {
            onSuccess: () => {
                reset();
                toast.success('Успешно создано!');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Ошибка при создании');
                onOpenChange(false);
            }
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить варианта</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название варианта.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button disabled={processing} onClick={onSubmit}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default CreateVariant;
