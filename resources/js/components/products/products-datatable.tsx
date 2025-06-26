import { PaginationBar } from '@/components/pagination';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Product } from '@/types/products';
import { Link, router } from '@inertiajs/react';
import { AsteriskIcon, CogIcon, ImagesIcon, LinkIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent } from '../ui/popover';

type Props = {
    products: PaginatedResponse<Product>;
    onSort: (field: string) => void;
    sortField: string;
    sortDirection: 'asc' | 'desc';
};

export default function ProductsDatatable({ products, onSort, sortField, sortDirection }: Props) {
    const renderSortIcon = (field: string) => {
        if (sortField !== field) return '';
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    const changeStatus = (id: number, newStatus: boolean) => {
        router.patch(
            route('admin.product.changeStatus', id),
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Успешно обновлено.');
                },
                onError: () => {
                    toast.error('Ошибка обновление.');
                },
            },
        );
    };
    return (
        <div>
            <Table className={'w-full'}>
                <TableCaption>
                    <div className="flex justify-end">
                        <PaginationBar pagination={products} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => onSort('id')} className="w-15 cursor-pointer">
                            ID{renderSortIcon('id')}
                        </TableHead>
                        <TableHead className="w-12">Картинка</TableHead>
                        <TableHead onClick={() => onSort('name')} className="w-full cursor-pointer">
                            Название{renderSortIcon('name')}
                        </TableHead>
                        <TableHead onClick={() => onSort('price')} className="cursor-pointer">
                            Цена{renderSortIcon('price')}
                        </TableHead>
                        <TableHead onClick={() => onSort('qty')} className="cursor-pointer">
                            Кол-во{renderSortIcon('qty')}
                        </TableHead>
                        <TableHead onClick={() => onSort('code')} className="cursor-pointer">
                            Код{renderSortIcon('code')}
                        </TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действие</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.data.length > 0 ? (
                        products.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className={'min-w-15'}>{item.id}</TableCell>
                                <TableCell>
                                    <img src={`/${item.thumb_image}`} alt={item.name} className="h-12 w-12 object-cover" />
                                </TableCell>
                                <TableCell className={'max-w-200 min-w-200'}>
                                    <span className={'text-balance'}>{item.name}</span>{' '}
                                </TableCell>
                                <TableCell className={'min-w-15'}>{item.price}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>
                                    <Switch
                                        aria-label={"toggle-status"}
                                        className={'data-[state=checked]:bg-green-400'}
                                        checked={item.status}
                                        onCheckedChange={(val) => changeStatus(item.id, val)}
                                    />
                                </TableCell>
                                <TableCell className={'flex items-center justify-center'}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href={route('admin.product.edit', item.id)}>
                                                <Button variant="ghost" aria-label={"Редактировать"} size="sm" className={'text-blue-400'}>
                                                    <PencilIcon />
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p aria-label={"Редактировать"}>Редактировать</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" aria-label={"удалить"} className={'text-red-500'}>
                                                <Trash2Icon />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Удалить</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button aria-label={"больше меню"} variant="ghost" size="sm">
                                                <CogIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent side={'left'} className={'flex w-auto flex-col justify-start p-0'}>
                                            <TextLink href={route('admin.products-image-gallery.index', { product: item.id })}>
                                                <Button variant="ghost" size="sm" className={'w-full'}>
                                                    <ImagesIcon />
                                                    Галерея
                                                </Button>
                                            </TextLink>
                                            <TextLink href={route('admin.product-variant.index', { product: item.id })}>
                                                <Button variant="ghost" size="sm">
                                                    <AsteriskIcon />
                                                    Варианты
                                                </Button>
                                            </TextLink>
                                            <Button variant="ghost" size="sm">
                                                <LinkIcon />
                                                Источник
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                Нет данных
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
