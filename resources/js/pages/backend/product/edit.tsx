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
import type { Product } from '@/types/products';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Content } from '@tiptap/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
    },
    {
        title: 'Товары',
        href: '/admin/products',
    },
    {
        title: 'Редактировать товар',
        href: '/admin/products/create',
    },
];

interface EditProductProps {
    product: Product;
    categories: Array<{ id: number; name: string }>;
    subCategories: Array<{ id: number; name: string; category_id: number }>;
    childCategories: Array<{ id: number; name: string; category_id: number; sub_category_id: number }>;
    brands: Array<{ id: number; name: string }>;
}

export type EditProductForm = {
    code: number;
    name: string;
    thumb_image: File | string;
    category_id: number | string | null;
    sub_category_id: number | string | null;
    child_category_id: number | string | null;
    brand_id: number | string | null;
    qty: number;
    short_description: string;
    long_description: string | Content;
    video_link: string;
    link_source: string;
    sku: string;
    price: number;
    cost_price: number | null;
    offer_price: number | null;
    offer_start_date: string | null;
    offer_end_date: string | null;
    product_type: string;
    status: boolean;
    is_approved: boolean;
    seo_title: string;
    seo_description: string;
    link_first?: string;
};

const Edit = ({ product, categories, subCategories, childCategories, brands }: EditProductProps) => {
    console.log('ПРодукт', product);
    const { data, setData, patch, processing, errors, reset } = useForm<Required<EditProductForm>>('editProduct', {
        code:            product.code,
        name:            product.name,
        thumb_image:     product.thumb_image,
        category_id:     product.category_id,
        sub_category_id: product.sub_category_id ?? '',
        child_category_id: product.child_category_id ?? '',
        brand_id:        product.brand_id ?? '',
        qty:             product.qty,
        short_description:  product.short_description,
        long_description:   product.long_description,
        video_link:        product.video_link        ?? '',
        link_source:       product.link_source       ?? '',
        sku:               product.sku,
        price:             product.price,
        cost_price:        product.cost_price        ?? 0,
        offer_price:       product.offer_price       ?? 0,
        offer_start_date:  product.offer_start_date  ? new Date(product.offer_start_date).toISOString() : '',
        offer_end_date:    product.offer_end_date    ? new Date(product.offer_end_date).toISOString()   : '',
        product_type:      product.product_type,
        status:            product.status,
        is_approved:       product.is_approved,
        seo_title:         product.seo_title         ?? '',
        seo_description:   product.seo_description   ?? '',
        link_first:        product.link_first        ?? '',
    });
    console.log('Data', data);
    console.log('Errors', errors);
    const filteredSubCategories = subCategories.filter((sub) => sub.category_id === Number(data.category_id));
    const filteredChildCategories = childCategories.filter((sub) => sub.sub_category_id === Number(data.sub_category_id));

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        // Собираем FormData
        const payload = new FormData()

        // Спуфим метод
        payload.append('_method', 'patch')

        // Добавляем все поля
        payload.append('code', String(data.code))
        payload.append('name', data.name)
        if (data.category_id != null)      payload.append('category_id', String(data.category_id))
        if (data.sub_category_id != null)  payload.append('sub_category_id', String(data.sub_category_id))
        if (data.child_category_id != null)payload.append('child_category_id', String(data.child_category_id))
        if (data.brand_id != null)         payload.append('brand_id', String(data.brand_id))

        payload.append('qty', String(data.qty))
        payload.append('short_description', data.short_description)
        payload.append('long_description', String(data.long_description))
        payload.append('sku', data.sku)
        payload.append('price', String(data.price))
        payload.append('cost_price', String(data.cost_price ?? ''))
        payload.append('offer_price', String(data.offer_price  ?? ''))
        payload.append('offer_start_date', data.offer_start_date ?? '')
        payload.append('offer_end_date',   data.offer_end_date   ?? '')
        payload.append('product_type',     data.product_type)
        payload.append('status',           data.status ? '1' : '0')
        payload.append('seo_title',        data.seo_title)
        payload.append('seo_description',  data.seo_description ?? '')
        payload.append('link_source',      data.link_source)
        payload.append('link_first',       data.link_first ?? '')

        // И файл, если он есть
        if (data.thumb_image instanceof File) {
            payload.append('thumb_image', data.thumb_image)
        }

        router.post(
            route('admin.product.update', product.id),
            payload,
            {
                forceFormData: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Успешно обновлено!')
                },
                onError: () => {
                    toast.error('Ошибка при обновлении')
                }
            }
        )
    };

    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title={'Редактировать товар'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center md:justify-between">
                        <div>
                            <h2>Редактировать продукт - {product.name}</h2>
                            <p>Здесь вы можете редактировать название, картинка и все данные продукта.</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="h-16 w-16">
                                <img src={`/${product.thumb_image}`} alt={product.name} />
                            </div>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setData('thumb_image', file);
                                    }
                                }}
                            />
                        </div>
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
                                selectedId={data.category_id?.toString() ?? String(data.category_id)}
                                onChange={(val) => setData('category_id', val)}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'SubCategory'}>Подкатегория</Label>
                            <SelectCategory
                                disabled={!data.category_id}
                                categories={filteredSubCategories}
                                selectedId={data.sub_category_id?.toString() ?? String(data.sub_category_id)}
                                onChange={(val) => setData('sub_category_id', val)}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'SubCategory'}>Дочерняя категория</Label>
                            <SelectCategory
                                disabled={!data.sub_category_id}
                                categories={filteredChildCategories}
                                selectedId={data.child_category_id?.toString() ?? String(data.child_category_id)}
                                onChange={(val) => setData('child_category_id', val)}
                            />
                        </div>
                    </div>
                    <div className={'flex items-center justify-between space-x-2'}>
                        <div className={'w-full'}>
                            <Label htmlFor={'Category'}>Бренд</Label>
                            <SelectCategory
                                categories={brands}
                                selectedId={data.brand_id?.toString() ?? String(data.brand_id)}
                                onChange={(val) => setData('brand_id', val)}
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'code'}>Код товара</Label>
                            <Input
                                id={'code'}
                                type={'number'}
                                value={data.code}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const num = val === '' ? 0 : Number(val);
                                    setData('code', num);
                                }}
                                placeholder="1561"
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'sku'}>Складской номер</Label>
                            <Input id={'sku'} value={data.sku} onChange={(e) => setData('sku', e.target.value)} placeholder={data.sku} />
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
                                    const val = e.target.value;
                                    const num = val === '' ? 0 : Number(val);
                                    setData('price', num);
                                }}
                                placeholder="10"
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'cost_price'}>Себестоимость (в сомони)</Label>
                            <Input
                                id={'cost_price'}
                                type={'number'}
                                value={data.cost_price ?? 0}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const num = val === '' ? 0 : Number(val);
                                    setData('cost_price', num);
                                }}
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
                                value={data.offer_price ?? 0}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    const num = val === '' ? 0 : Number(val);
                                    setData('offer_price', num);
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
                                    onChange={(date) => setData('offer_start_date', date?.toISOString() ?? '')}
                                />
                            </div>
                            <div className={'flex w-full flex-col space-y-2'}>
                                <Label htmlFor={'offer_start_date'}>Конец скидки</Label>
                                {data.offer_start_date && (
                                    <DatePicker
                                        startDate={new Date(data.offer_start_date)}
                                        placeholder={'Выберите конец скидки'}
                                        value={data.offer_end_date ? new Date(data.offer_end_date) : undefined}
                                        onChange={(date) => setData('offer_end_date', date?.toISOString() ?? '')}
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
                                    const val = e.target.value;
                                    const num = val === '' ? 0 : Number(val);
                                    setData('qty', num);
                                }}
                                placeholder="10"
                            />
                        </div>
                        <div className={'w-full'}>
                            <Label htmlFor={'cost_price'}>Тип продукта</Label>
                            <SelectTypeProduct onChange={(val) => setData('product_type', val)} selectedVal={product.product_type} />
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <Label htmlFor={'short_description'}>Короткое описание</Label>
                        <Input
                            value={data.short_description ?? ''}
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
                            value={data.seo_title ?? ''}
                            id={'seo_title'}
                            onChange={(e) => {
                                setData('seo_title', e.target.value);
                            }}
                        />
                    </div>

                    <div className={'w-full'}>
                        <Label htmlFor={'seo_description'}>SEO описание</Label>
                        <Textarea
                            value={data.seo_description ?? ''}
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
                                value={data.link_source ?? ''}
                                onChange={(e) => setData('link_source', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-full">
                            <Label htmlFor={'link_first'}>Ещё доп. ссылка</Label>
                            <Input type={'url'} id={'link_first'} value={data.link_first ?? ''} onChange={(e) => setData('link_first', e.target.value)} />
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

export default Edit;
