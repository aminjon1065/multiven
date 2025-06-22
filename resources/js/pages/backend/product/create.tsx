import { DatePicker } from '@/components/date-picker';
import { SelectCategory } from '@/components/select-category';
import { SelectTypeProduct } from '@/components/select-type-product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MinimalTiptapEditor } from '@/components/ui/minimal-tiptap';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { TypeProduct } from '@/types/enums/type-products';
import { Head, Link, useForm } from '@inertiajs/react';
import { Content } from '@tiptap/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Тоовары',
        href: '/admin/products',
    },
    {
        title: 'Добавить товар',
        href: '/admin/products/create',
    },
];

type createProduct = {
    code: string;
    name: string;
    thumb_image: File | string;
    category_id?: string;
    sub_category_id?: string;
    child_category_id?: string;
    brand_id?: string;
    qty: string;
    short_description: string;
    long_description?: Content;
    video_link: string | null;
    link_source?: string;
    sku: string;
    price: string;
    cost_price: string;
    offer_price: string;
    offer_start_date?: string | Date | null;
    offer_end_date?: string | Date | null;
    product_type?: TypeProduct | string | null;
    status: boolean;
    is_approved: boolean;
    seo_title?: string;
    seo_description?: string | null;
    link_first?: string;
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

const Create = ({ categories, subCategories, childCategories, brands }: PropsCreateProduct) => {
    const { data, setData, post, processing, reset } = useForm<Required<createProduct>>({
        code: '',
        name: '',
        thumb_image: '',
        category_id: '',
        sub_category_id: '',
        child_category_id: '',
        brand_id: '',
        qty: '',
        short_description: '',
        long_description: '',
        video_link: '',
        link_source: '',
        sku: '',
        price: '',
        cost_price: '',
        offer_price: '',
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
        const startDate = data.offer_start_date ? new Date(data.offer_start_date) : null;
        const endDate = data.offer_end_date ? new Date(data.offer_end_date) : null;

        if (startDate && endDate && startDate > endDate) {
            toast.error('Дата начала скидки не может быть позже даты окончания');
            return;
        }

        post(route('admin.product.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast.success('Успешно создано!');
            },
            onError: (error) => {
                console.log(error);
                toast.error('Ошибка при создании');
            },
        });
    };
    const filteredSubCategories = subCategories.filter((sub) => sub.category_id === Number(data.category_id));
    const filteredChildCategories = childCategories.filter((sub) => sub.sub_category_id === Number(data.sub_category_id));
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Добавить товар'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <div>
                            <h2>Добавить продукт</h2>
                            <p>Здесь вы можете добавить название, картинка и все данные продукта.</p>
                        </div>
                    </div>
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
                                <SelectCategory
                                    categories={categories}
                                    selectedId={data.category_id}
                                    onChange={(val) => setData('category_id', val)}
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label htmlFor={'SubCategory'}>Подкатегория</Label>
                                <SelectCategory
                                    disabled={!data.category_id}
                                    categories={filteredSubCategories}
                                    selectedId={data.sub_category_id}
                                    onChange={(val) => setData('sub_category_id', val)}
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label htmlFor={'SubCategory'}>Дочерняя категория</Label>
                                <SelectCategory
                                    disabled={!data.sub_category_id}
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
                        <div className={'flex items-center justify-between space-x-2'}>
                            <div className={'w-full'}>
                                <Label htmlFor={'price'}>Цена (в сомони)</Label>
                                <Input
                                    id={'price'}
                                    type={'number'}
                                    value={data.price}
                                    onChange={(e) => {
                                        setData('price', e.target.value);
                                    }}
                                    placeholder="10"
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label htmlFor={'cost_price'}>Себестоимость (в сомони)</Label>
                                <Input
                                    id={'cost_price'}
                                    type={'number'}
                                    value={data.cost_price}
                                    onChange={(e) => setData('cost_price', e.target.value)}
                                    placeholder="11"
                                />
                            </div>
                        </div>
                        <div className={'flex items-center justify-between space-x-2'}>
                            <div className={'w-full'}>
                                <Label htmlFor={'offer_price'}>Цена скидки (в сомони)</Label>
                                <Input
                                    id={'offer_price'}
                                    type={'offer_price'}
                                    value={data.offer_price}
                                    onChange={(e) => {
                                        setData('offer_price', e.target.value);
                                    }}
                                    placeholder="9"
                                />
                            </div>
                            <div className={'flex w-full items-center justify-between space-x-2'}>
                                <div className={'flex w-full flex-col space-y-2'}>
                                    <Label htmlFor={'offer_start_date'}>Начало скидки</Label>
                                    <DatePicker
                                        placeholder={'Выберите начало скидки'}
                                        value={data.offer_start_date ? new Date(data.offer_start_date) : undefined}
                                        onChange={(date) => {
                                            if (date) {
                                                // 1) переводим Date → ISO-полночь "YYYY-MM-DD"
                                                const isoDay = date.toISOString().slice(0, 10);
                                                setData('offer_start_date', isoDay);
                                            } else {
                                                setData('offer_start_date', '');
                                            }
                                        }}
                                    />
                                </div>
                                <div className={'flex w-full flex-col space-y-2'}>
                                    <Label htmlFor={'offer_start_date'}>Конец скидки</Label>
                                    {data.offer_start_date && (
                                        <DatePicker
                                            startDate={new Date(data.offer_start_date)}
                                            placeholder={'Выберите конец скидки'}
                                            value={data.offer_end_date ? new Date(data.offer_end_date) : undefined}
                                            onChange={(date) => {
                                                if (date) {
                                                    setData('offer_end_date', date.toISOString().slice(0, 10));
                                                } else {
                                                    setData('offer_end_date', '');
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={'flex items-center justify-between space-x-2'}>
                            <div className={'w-full'}>
                                <Label htmlFor={'qty'}>Количество на складе</Label>
                                <Input
                                    id={'qty'}
                                    type={'number'}
                                    value={data.qty}
                                    onChange={(e) => {
                                        setData('qty', e.target.value);
                                    }}
                                    placeholder="10"
                                />
                            </div>
                            <div className={'w-full'}>
                                <Label htmlFor={'cost_price'}>Тип продукта</Label>
                                <SelectTypeProduct onChange={(val) => setData('product_type', val)} />
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'short_description'}>Короткое описание</Label>
                            <Input
                                value={data.short_description}
                                id={'short_description'}
                                onChange={(e) => {
                                    setData('short_description', e.target.value);
                                }}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'long_description'}>Полное описание</Label>
                            <div className={'flex items-center justify-between space-x-2'}>
                                <ScrollArea className={'h-[300px] w-full'}>
                                    <MinimalTiptapEditor
                                        value={data.long_description}
                                        onChange={(e) => setData('long_description', e)}
                                        className="w-full"
                                        editorContentClassName="p-5"
                                        output="html"
                                        placeholder="Enter your description..."
                                        autofocus={true}
                                        editable={true}
                                        editorClassName="focus:outline-hidden"
                                    />
                                </ScrollArea>
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'seo_title'}>SEO Заголовок</Label>
                            <Input
                                value={data.seo_title}
                                id={'seo_title'}
                                onChange={(e) => {
                                    setData('seo_title', e.target.value);
                                }}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'seo_description'}>SEO описание</Label>
                            <Textarea
                                id={'seo_description'}
                                onChange={(e) => {
                                    setData('seo_description', e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex w-full">
                            <div className="w-full">
                                <Label htmlFor={'link_source'}>Ссылка приобретения</Label>
                                <Input
                                    type={'url'}
                                    id={'link_source'}
                                    value={data.link_source}
                                    onChange={(e) => setData('link_source', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-full">
                                <Label htmlFor={'link_first'}>Ещё доп. ссылка</Label>
                                <Input
                                    type={'url'}
                                    id={'link_first'}
                                    value={data.link_first}
                                    onChange={(e) => setData('link_first', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end space-x-2">
                        <Link href={route('admin.product.index')}>
                            <Button variant="secondary">Отмена</Button>
                        </Link>
                        <Button disabled={processing} onClick={onSubmit}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </AppAdminLayout>
    );
};

export default Create;
