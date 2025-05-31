import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Brand } from '@/types/brand';
import { router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const UpdateBrand = ({
                         open,
                         onOpenChange,
                         item,
                     }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: Brand | null;
}) => {
    const [name, setName] = useState(item?.name ?? '');
    const [logo, setLogo] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [status, setStatus] = useState(item?.status ?? false);
    const [isFeatured, setIsFeatured] = useState(item?.is_featured ?? false);
    const [processing, setProcessing] = useState(false);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!item) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status ? '1' : '0');
        formData.append('is_featured', isFeatured ? '1' : '0');
        if (logo) {
            formData.append('logo', logo);
        }

        // Laravel воспринимает PATCH через POST, если указать _method
        formData.append('_method', 'PATCH');

        setProcessing(true);

        router.post(route('admin.brand.update', item.id), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Бренд обновлён');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Ошибка при обновлении бренда');
            },
            onFinish: () => setProcessing(false),
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Обновить бренд</DialogTitle>
                    <DialogDescription>
                        Здесь вы можете обновить название, статус, флаг и лого бренда.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-3">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Название"
                    />
                    <div className="flex items-center justify-between space-x-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setLogo(file);
                                    setFileName(file.name);
                                }
                            }}
                        />
                        <p className="text-muted-foreground text-sm truncate max-w-[200px]">{fileName}</p>
                    </div>

                    {/* Пример чекбоксов/переключателей */}
                    {/* Добавь свой кастомный UI здесь, если нужно */}
                    <div className="flex items-center space-x-3">
                        <label>
                            <input
                                type="checkbox"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />{' '}
                            Активен
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={(e) => setIsFeatured(e.target.checked)}
                            />{' '}
                            В избранном
                        </label>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary" type="button">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            Сохранить
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateBrand;
