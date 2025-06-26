import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type CreateVariant = {
    name: string;
    price: number;
    status: boolean;
    is_default: boolean;
    product_variant_id: number;
};
const CreateVariantItem = ({
    open,
    onOpenChange,
    product_variant_id,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product_variant_id: number;
}) => {
    const { data, setData, post, processing, reset } = useForm<Required<CreateVariant>>({
        name: '',
        price: 0,
        is_default: false,
        status: true,
        product_variant_id: product_variant_id,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.product-variant-item.store', { variant: product_variant_id }), {
            onSuccess: () => {
                reset();
                toast.success('Успешно создано!');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Ошибка при создании');
                onOpenChange(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить элемент варианта</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название, цена и статус элемента.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                </div>
                <div className="space-y-3">
                    <Input value={data.price} type={'number'} onChange={(e) => setData('price', Number(e.target.value))} placeholder="Название" />
                </div>
                <div className="flex w-full justify-around">
                    <div className="flex w-full flex-col space-y-3">
                        <Label htmlFor={'status'}>Статус</Label>
                        <Switch
                            id={'status'}
                            className={'data-[state=checked]:bg-green-400'}
                            checked={data.status}
                            onCheckedChange={(val) => setData('status', val)}
                        />
                    </div>
                    <div className="flex w-full flex-col space-y-3">
                        <Label htmlFor={'is_default'}>По умолчанию</Label>
                        <Switch
                            id={'is_default'}
                            className={'data-[state=checked]:bg-green-400'}
                            checked={data.is_default}
                            onCheckedChange={(val) => setData('is_default', val)}
                        />
                    </div>
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
export default CreateVariantItem;
