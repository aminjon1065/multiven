import { PaginationBar } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Review } from '@/types/review';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
    reviews: PaginatedResponse<Review>;
};

export default function ReviewDatatable({ reviews }: Props) {
    const changeStatus = (id: number, newStatus: boolean) => {
        console.log("status: ", newStatus);
        router.patch(
            route('admin.reviews.changeStatus', id),
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
                        <PaginationBar pagination={reviews} />
                    </div>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-15 cursor-pointer">ID</TableHead>
                        <TableHead className="cursor-pointer">Товар</TableHead>
                        <TableHead className="cursor-pointer">Пользователь</TableHead>
                        <TableHead className="cursor-pointer">Оценка</TableHead>
                        <TableHead className="cursor-pointer">Комментарий</TableHead>
                        <TableHead>Продавец</TableHead>
                        <TableHead>Статус</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.data.length > 0 ? (
                        reviews.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className={'min-w-15'}>{item.id}</TableCell>
                                <TableCell className={'max-w-200 min-w-200'}>
                                    <span className={'text-balance'}>{item.product.name}</span>{' '}
                                </TableCell>
                                <TableCell className={'min-w-15'}>{item.user.name}</TableCell>
                                <TableCell>{item.rating}</TableCell>
                                <TableCell>{item.review}</TableCell>
                                <TableCell>
                                    <Switch
                                        aria-label={'toggle-status'}
                                        className={'data-[state=checked]:bg-green-400'}
                                        checked={item.status}
                                        onCheckedChange={(val) => changeStatus(item.id, val)}
                                    />
                                </TableCell>
                                <TableCell>{item.vendor.shop_name}</TableCell>

                                <TableCell className={'flex items-center justify-center'}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="sm" aria-label={'удалить'} className={'text-red-500'}>
                                                <Trash2Icon />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Удалить</p>
                                        </TooltipContent>
                                    </Tooltip>
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
