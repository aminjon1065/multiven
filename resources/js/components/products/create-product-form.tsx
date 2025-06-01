import { SelectCategory } from '@/components/select-category';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { TypeProduct } from '@/types/enums/type-products';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

type createProduct = {
    code: string;
    name: string;
    thumb_image: File | string;
    // vendor_id: string | number | null;
    category_id?: string;
    sub_category_id?: string;
    child_category_id?: string;
    brand_id?: string;
    qty: number;
    short_description: string | null;
    long_description?: string | null;
    video_link: string | null;
    link_source: string | null;
    sku: string;
    price: number;
    cost_price: number | null;
    offer_price?: number | null;
    offer_start_date?: string | Date | null;
    offer_end_date?: string | Date | null;
    product_type?: TypeProduct | string | null;
    status: boolean;
    is_approved: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    link_first?: string | null;
};

type PropsCreateProduct = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: { id: number; name: string }[];
    subCategories: { id: number; name: string; category_id: number }[];
    childCategories: {
        id: number;
        name: string;
        category_id: number;
        sub_category_id: number;
    }[];
    brands: { id: number; name: string }[];
};

const CreateProductForm = ({ open, onOpenChange, categories, subCategories, childCategories, brands }: PropsCreateProduct) => {
    const { data, setData, post, processing, reset } = useForm<Required<createProduct>>({
        code: '',
        name: '',
        thumb_image: '',
        category_id: '',
        sub_category_id: '',
        child_category_id: '',
        brand_id: '',
        qty: 0,
        short_description: '',
        long_description: '',
        video_link: '',
        link_source: '',
        sku: '',
        price: 0,
        cost_price: 0,
        offer_price: 0,
        offer_start_date: '',
        offer_end_date: '',
        product_type: '',
        status: true,
        is_approved: true,
        seo_title: '',
        seo_description: '',
        link_first: '',
    });
    const [fileName, setFileName] = useState('');
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.product.store'), {
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
    const filteredSubCategories = subCategories.filter((sub) => sub.category_id === Number(data.category_id));
    const filteredChildCategories = childCategories.filter((sub) => sub.sub_category_id === Number(data.sub_category_id));
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={'min-w-4xl'}>
                <DialogHeader>
                    <DialogTitle>Добавить Продукт</DialogTitle>
                    <DialogDescription>Здесь вы можете добавить название, картинка и все данные продукта.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2">
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setData('thumb_image', file);
                                    setFileName(file.name);
                                }
                            }}
                        />
                        <p className="text-muted-foreground text-sm">{fileName}</p>
                    </div>
                    <div>
                        <Label htmlFor={'name'}>Название</Label>
                        <Input id={'name'} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Название" />
                    </div>
                    <div className={'flex items-center justify-between space-x-2'}>
                        <div className={'w-full'}>
                            <Label htmlFor={'Category'}>Категория</Label>
                            <SelectCategory categories={categories} selectedId={data.category_id} onChange={(val) => setData('category_id', val)} />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'SubCategory'}>Подкатегория</Label>
                            <SelectCategory
                                categories={filteredSubCategories}
                                selectedId={data.sub_category_id}
                                onChange={(val) => setData('sub_category_id', val)}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'SubCategory'}>Дочерняя категория</Label>
                            <SelectCategory
                                categories={filteredChildCategories}
                                selectedId={data.child_category_id}
                                onChange={(val) => setData('child_category_id', val)}
                            />
                        </div>
                    </div>
                    <div className={'flex items-center justify-between space-x-2'}>
                        <div className={'w-full'}>
                            <Label htmlFor={'Category'}>Бренд</Label>
                            <SelectCategory categories={brands} selectedId={data.brand_id} onChange={(val) => setData('brand_id', val)} />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'code'}>Код товара</Label>
                            <Input id={'code'} value={data.code} onChange={(e) => setData('code', e.target.value)} placeholder="1561" />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'sku'}>Складской номер</Label>
                            <Input id={'sku'} value={data.sku} onChange={(e) => setData('sku', e.target.value)} placeholder="15D/61" />
                        </div>
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
export default CreateProductForm;
