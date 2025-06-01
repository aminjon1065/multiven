import type { Editor } from '@tiptap/react';
import type { VariantProps } from 'class-variance-authority';
import type { toggleVariants } from '@/components/ui/toggle';
import { useState } from 'react';
import { ImageIcon } from '@radix-ui/react-icons';
import { ToolbarButton } from '../toolbar-button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { ImageEditBlock } from './image-edit-block';

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
    editor: Editor;
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ToolbarButton
                    isActive={editor.isActive('image')}
                    tooltip="Картинка"
                    aria-label="Image"
                    size={size}
                    variant={variant}
                >
                    <ImageIcon className="size-5" />
                </ToolbarButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Выбрать картинку</DialogTitle>
                    <DialogDescription className="sr-only">
                        Загрузите изображение со своего компьютера
                    </DialogDescription>
                </DialogHeader>
                <ImageEditBlock editor={editor} close={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

export { ImageEditDialog };
