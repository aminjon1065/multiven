import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Input } from '../ui/input';

type CreateCategory = {
    name: string;
    slug: string;
    icon: string;
    status: boolean;
};
const CreateCategoryForm = () => {
    const { data, setData, post, errors, processing } = useForm<Required<CreateCategory>>({
        name: '',
        slug: '',
        icon: '',
        status: true,
    });
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.category.store'));
    };

    return (
        <form onSubmit={onSubmit}>
            <Label htmlFor={'name'}>Username</Label>
            <Input placeholder="shadcn" id={'name'} value={data.name} onChange={(e) => setData('name', e.target.value)} />
            {errors.name && <span>Ошибка в Имени</span>}
            <Button disabled={processing}>Submit</Button>
        </form>
    );
};

export default CreateCategoryForm;
