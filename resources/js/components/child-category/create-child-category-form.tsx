import { SelectCategory } from '@/components/select-category';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';

type childCategory = {
    category_id?: string;
    sub_category_id: string;
    name: string;
    status: boolean;
};
const CreateChildCategory = ({
    open,
    onOpenChange,
    categories,
    subCategories,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: { id: number; name: string }[];
    subCategories: { id: number; name: string }[];
}) => {
    const { data, setData, post, processing } = useForm<Required<childCategory>>({
        category_id: '',
        sub_category_id: '',
        name: '',
        status: true,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.child-category.store'), {
            onSuccess: () => {
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
                    <DialogTitle>Добавить дочернюю категорию</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название, категорию и подкатегорию.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div>
                        <Label htmlFor={"name"}>
                            Название
                        </Label>
                        <Input id={"name"} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    </div>
                    <div>
                        <Label>
                            Категория
                        </Label>
                        <SelectCategory categories={categories} selectedId={data.category_id} onChange={(val) => setData('category_id', val)} />
                    </div>
                    <div>
                        <Label>
                            Подкатегория
                        </Label>
                        <SelectCategory
                            categories={subCategories}
                            selectedId={data.sub_category_id}
                            onChange={(val) => setData('sub_category_id', val)}
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
export default CreateChildCategory;
