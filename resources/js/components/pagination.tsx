import { PaginatedResponse } from '@/types/paginateResponse';
import { Link } from '@inertiajs/react';

type PaginationProps = {
    pagination: PaginatedResponse<any>;
};

export function Pagination({ pagination }: PaginationProps) {
    return (
        <div className="mt-6 flex flex-wrap gap-2">
            {pagination.links.map((link, i) => {
                let label = link.label;
                if (label.includes('&laquo;') || label.toLowerCase().includes('previous')) {
                    label = 'Назад';
                } else if (label.includes('&raquo;') || label.toLowerCase().includes('next')) {
                    label = 'Вперёд';
                }
                return (
                    <Link
                        key={i}
                        href={link.url ?? ''}
                        dangerouslySetInnerHTML={{ __html: label }}
                        className={`rounded border px-3 py-1 text-sm ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : link.url
                                  ? 'bg-white text-gray-700 hover:bg-gray-100'
                                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }`}
                    />
                );
            })}
        </div>
    );
}
