import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Brand } from '@/types/brand';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

type updateBrand = {
    name: string;
    logo: string | File;
    status: boolean;
    is_featured: boolean;
};
const UpdateBrand = ({ open, onOpenChange, item }: { open: boolean; onOpenChange: (open: boolean) => void; item: Brand | null }) => {
    const { data, setData, patch, processing, reset } = useForm<Required<updateBrand>>({
        name: item?.name,
        logo: item?.logo,
        is_featured: item?.is_featured,
        status: item?.status,
    });
    const [fileName, setFileName] = useState('');
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.brand.update', item?.id), {
            forceFormData: true,
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
                    <DialogTitle>Добавить бренд</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название и лого бренда.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    <div className="flex items-center justify-between space-x-2">
                        <Input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('logo', file);
                                    setFileName(file.name);
                                }
                            }}
                        />
                        <p className="text-muted-foreground text-sm">{fileName}</p>
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
export default UpdateBrand;
