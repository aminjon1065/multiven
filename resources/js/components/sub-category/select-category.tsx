import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function SelectCategory({
                                   categories,
                                   selectedId,
                                   onChange,
                               }: {
    categories: { id: number; name: string }[]
    selectedId: string
    onChange: (value: string) => void
}) {
    return (
        <Select value={selectedId} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {categories.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
