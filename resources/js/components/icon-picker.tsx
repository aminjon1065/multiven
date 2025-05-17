'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // если используешь shadcn
import { useState } from 'react';

const presetIcons = ['fa-user', 'fa-camera', 'fa-book', 'fa-star', 'fa-heart', 'fa-cogs', 'fa-music', 'fa-leaf', 'fa-shopping-cart', 'fa-chart-line'];

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export default function IconPicker({ value, onChange }: Props) {
    const [customValue, setCustomValue] = useState(value);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <i className={cn('fa-solid mr-2', value)} />
                    {value || 'Выбрать иконку'}
                </Button>
            </DialogTrigger>
            <DialogTitle title={'Выберите иконку'} />
            <DialogContent className="max-w-lg">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Выберите иконку</h2>
                    <div className="grid grid-cols-5 gap-3">
                        {presetIcons.map((icon) => (
                            <button
                                key={icon}
                                onClick={() => {
                                    onChange(icon);
                                    setCustomValue(icon);
                                    setOpen(false);
                                }}
                                className={cn(
                                    'flex flex-col items-center justify-center rounded border p-3 text-sm hover:bg-gray-100',
                                    icon === value && 'border-blue-500 bg-blue-50',
                                )}
                            >
                                <i className={`fa-solid ${icon} mb-1 text-xl`} />
                                {icon.replace('fa-', '')}
                            </button>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <label className="text-sm font-medium">Или введите свою:</label>
                        <Input value={customValue} onChange={(e) => setCustomValue(e.target.value)} placeholder="fa-bolt, fa-plane и т.д." />
                        <div className="mt-2 flex items-center gap-3">
                            <i className={`fa-solid ${customValue} text-2xl`} />
                            <Button
                                onClick={() => {
                                    onChange(customValue);
                                    setOpen(false);
                                }}
                                variant="default"
                            >
                                Выбрать
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
