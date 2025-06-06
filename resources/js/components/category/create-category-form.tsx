import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

type CreateCategory = {
    name: string;
    icon: string;
    status: boolean;
};
const CreateCategoryForm = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
    const { data, setData, post, processing, reset} = useForm<Required<CreateCategory>>({
        name: '',
        icon: 'fa-user',
        status: true,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.category.store'), {
            onSuccess: () => {
                reset()
                toast.success('Успешно создано!');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Ошибка при создании');
                onOpenChange(false);
            },
        });
    };
    console.log(data);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить категорию</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название и иконку категории.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    <div className="flex items-center justify-between space-x-2">
                        <Input value={data.icon} onChange={(e) => setData('icon', e.target.value)} placeholder="Иконка" />{' '}
                        <i className={`fa-solid ${data.icon}`}></i>
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
export default CreateCategoryForm;
