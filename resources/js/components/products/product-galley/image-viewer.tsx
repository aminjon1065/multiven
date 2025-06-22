type Props = {
    images: File[];
    onRemove: (index: number) => void;
};

const ImageViewer = ({ images, onRemove }: Props) => {
    return (
        <div className="flex flex-wrap gap-2">
            {images.map((file, index) => {
                const imageUrl = URL.createObjectURL(file);
                return (
                    <div key={index} className="relative">
                        <img src={imageUrl} alt={`preview-${index}`} className="h-32 w-32 rounded object-cover" />
                        <button
                            className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white"
                            onClick={() => onRemove(index)}
                        >
                            ✕
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ImageViewer;
