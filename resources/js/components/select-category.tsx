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
                                   disabled = false,
                               }: {
    categories: { id: number; name: string }[]
    selectedId: string
    onChange: (value: string) => void
    disabled?: boolean
}) {
    return (
        <Select value={selectedId} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="w-full" disabled={disabled}>
                <SelectValue placeholder="Выберите из списка" />
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
