import React, { useState } from 'react';

type Props = {};

const ImageUploader = ({}: Props) => {
    const [images, setImages] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        // Преобразуем FileList в массив и добавим к текущим файлам
        const newFiles = Array.from(e.target.files);
        setImages((prev) => [...prev, ...newFiles]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />

            <div className="flex gap-2 flex-wrap mt-4">
                {images.map((file, index) => {
                    const imageUrl = URL.createObjectURL(file);
                    return (
                        <div key={index} className="relative">
                            <img
                                src={imageUrl}
                                alt={`preview-${index}`}
                                className="w-32 h-32 object-cover rounded"
                            />
                            <button
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => handleRemoveImage(index)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageUploader;
