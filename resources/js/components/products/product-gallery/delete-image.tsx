import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

type Props = {
    productImageGallery: number
}

export function DeleteImage({ productImageGallery }: Props) {
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        router.delete(route('admin.products-image-gallery.destroy', productImageGallery), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Картина успешно удалена.')
                setOpen(false)
            },
            onError: () => {
                toast.error('Ошибка при удалении.')
                setOpen(false)
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                variant="ghost"
                className="hover:text-red-500"
                onClick={() => setOpen(true)}
            >
                <Trash2Icon className="mr-1" />
                Удалить
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Удалить картину?</DialogTitle>
                    <DialogDescription>
                        Это действие необратимо.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
