import AppAdminLayout from '@/layouts/app-admin-layout';
import type { BreadcrumbItem } from '@/types';
import { PaginatedResponse } from '@/types/paginateResponse';
import { Review } from '@/types/review';
import { Head } from '@inertiajs/react';
import ReviewDatatable from '@/components/reviews/review-datatable';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Дашборд', href: '/admin/dashboard' },
    { title: 'Отзывы', href: '/admin/reviews' },
];

type Props = {
    reviews: PaginatedResponse<Review>;
};

const Index = ({ reviews }: Props) => {
    console.log(reviews);
    return (
        <AppAdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Отзывы" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ReviewDatatable reviews={reviews} />
            </div>
        </AppAdminLayout>
    );
};

export default Index;
