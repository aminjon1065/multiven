declare module '@fonticonpicker/react-fonticonpicker' {
    import * as React from 'react';

    export interface FontIconPickerProps {
        icons: string[];
        value?: string | string[];
        isMulti?: boolean;
        onChange?: (value: string | string[]) => void;
        theme?: string;
        renderUsing?: 'class' | 'name';
        search?: boolean;
        searchPlaceholder?: string;
        showAllIcons?: boolean;
        emptyIcon?: boolean;
        noIcon?: boolean;
        closeOnSelect?: boolean;
    }

    const FontIconPicker: React.FC<FontIconPickerProps>;

    export default FontIconPicker;
}
