import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectTypeProduct({ onChange }: { onChange: (val: string) => void }) {
    const typeProduct = [
        {
            name: 'Новая',
            value: 'new_arrival',
        },
        {
            name: 'Рекомендуемый',
            value: 'featured_product',
        },
        {
            name: 'Топ',
            value: 'top_product',
        },
        {
            name: 'Лучший',
            value: 'best_product',
        },
    ];
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбрать тип продукта" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {typeProduct.map((item) => (
                        <SelectItem value={item.value}>{item.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
