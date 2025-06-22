'use client';
import { ru } from 'date-fns/locale';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    startDate?: Date;
};

export function DatePicker({ value, onChange, placeholder = 'Выберите дату', startDate }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (date: Date | undefined) => {
        const result = format(date ?? new Date(), 'yyyy-MM-dd');
        onChange(new Date(result)); // передаём значение вверх
        setOpen(false); // закрываем поповер
    };
    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button id={'trigger'} variant="outline" className={cn('w-full', !value && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, 'PPP', { locale: ru }) : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                {startDate ? (
                    <Calendar disabled={(date) => date < startDate}  mode="single" selected={value} locale={ru} onSelect={handleSelect} initialFocus />
                ) : (
                    <Calendar mode="single" disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                    } selected={value} locale={ru} onSelect={handleSelect} initialFocus />
                )}
            </PopoverContent>
        </Popover>
    );
}
