import { SelectCategory } from '@/components/select-category';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

type SubCreatCategory = {
    category_id?: string;
    name: string;
    status: boolean;
};
const CreateSubCategoryForm = ({
    open,
    onOpenChange,
    categories,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: { id: number; name: string }[];
}) => {
    const { data, setData, post, processing, reset } = useForm<Required<SubCreatCategory>>({
        category_id: '',
        name: '',
        status: true,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.sub-category.store'), {
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
    useEffect(() => {
        console.log('mounted');
    }, []);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить подкатегория</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название и иконку подкатегории.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    <div className="w-full">
                        <SelectCategory categories={categories} selectedId={data.category_id} onChange={(val) => setData('category_id', val)} />
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
export default CreateSubCategoryForm;
