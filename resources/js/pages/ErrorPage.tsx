import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

type ErrorStatus = 401| 403 | 404 | 419 | 500 | 503;
const messages: Record<ErrorStatus, { title: string; message: string }> = {
    401: {
        title: '401 – UnAuth',
        message: 'Извините, вам надо авторизоваться.',
    },
    403: {
        title: '403 – Forbidden',
        message: 'Извините, вам не разрешен доступ к этой странице.',
    },
    404: {
        title: '404 – Страница не найдена',
        message: 'Извините, страница, которую вы ищете, не найдена.',
    },
    419: {
        title: '419 – Страница просрочена',
        message: 'Страница устарела. Пожалуйста, обновите и попробуйте еще раз.',
    },
    500: {
        title: '500 – Ошибка сервера',
        message: 'Упс! Что-то пошло не так на наших серверах.',
    },
    503: {
        title: '503 – Услуга недоступна',
        message: 'В настоящее время мы находимся на техническом обслуживании. Пожалуйста, зайдите позже.',
    },
};
export default function ErrorPage({ status = 500, message }: { status: number; message: string }) {
    const fallback = {
        title: `${status} – Ошибка`,
        message: 'Произошло нечто неожиданное.',
    };
    const content = (messages as Record<number, { title: string; message: string }>)[status] ?? fallback;
    return (
        <>
            <Head title={content.title} />
            <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">{status}</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-600 animate-pulse sm:text-7xl">{content.title}</h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{message && content.message}</p>
                    {status === 403 ? (
                        <div>
                            <p className={"text-gray-900 dark:text-white"}>
                                Вы админ? <TextLink href={route('login')}>Войти</TextLink>
                            </p>
                        </div>
                    ) : (
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={route('admin.dashboard')}>
                                <Button variant={'link'}>Дашборд</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
