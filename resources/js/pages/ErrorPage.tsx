import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type ErrorStatus = 403 | 404 | 419 | 500 | 503;
const messages: Record<ErrorStatus, { title: string; message: string }> = {
    403: {
        title: '403 – Forbidden',
        message: 'Sorry, you are not allowed to access this page.',
    },
    404: {
        title: '404 – Page Not Found',
        message: 'Sorry, the page you are looking for could not be found.',
    },
    419: {
        title: '419 – Page Expired',
        message: 'The page expired. Please refresh and try again.',
    },
    500: {
        title: '500 – Server Error',
        message: 'Whoops! Something went wrong on our servers.',
    },
    503: {
        title: '503 – Service Unavailable',
        message: 'We are currently under maintenance. Please check back soon.',
    },
};
export default function ErrorPage({ status = 500, message }: { status: number; message: string }) {
    const fallback = {
        title: `${status} – Error`,
        message: 'Something unexpected happened.',
    };
    const content = (messages as Record<number, { title: string; message: string }>)[status] ?? fallback;

    return (
        <>
            <Head title={content.title} />
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">{status}</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">{content.title}</h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{content.message}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="http://localhost:3000"
                        >
                            <Button variant={"link"}>
                            Главная
                            </Button>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}
