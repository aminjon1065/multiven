import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Category } from '@/types/category';
import formatterDay from '@/utils/dateFormatter';

const CategoryDatatable = ({ categories }: { categories: Category[] }) => {
    return (
        <div className="overflow-x-auto rounded-md border">
            <Table>
                <TableCaption>Lorem ipsum dolor sit amet.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Иконка</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Создано</TableHead>
                        <TableHead>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length ? (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <i className={`fa-solid ${category.icon}`}></i>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            className={'data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-blue-200'}
                                            color={'blue'}
                                            id="status"
                                            checked={category.status}
                                        />
                                        <Label htmlFor="status">Status</Label>
                                    </div>
                                </TableCell>
                                <TableCell>{formatterDay(category.created_at)}</TableCell>
                                <TableCell>
                                    <Button className="hover:underline">Редактировать</Button>
                                    <Button variant={'destructive'} className="hover:underline">
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-muted-foreground text-center">
                                Категории не найдены
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CategoryDatatable;
