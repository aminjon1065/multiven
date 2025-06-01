'use client';

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
};

export function DatePicker({ value, onChange, placeholder = 'Выберите дату' }: Props) {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (date: Date | undefined) => {
        onChange(date); // передаём значение вверх
        setOpen(false); // закрываем поповер
    };

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    id={'trigger'}
                    variant="outline"
                    className={cn('w-[240px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, 'PPP') : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
            >
                <Calendar mode="single" selected={value} onSelect={handleSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
