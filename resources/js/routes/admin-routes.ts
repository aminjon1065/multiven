// src/config/navigation.ts
import { type NavItem } from '@/types';
import {
    BaggageClaimIcon,
    BanknoteIcon,
    BookOpen,
    Folder,
    FootprintsIcon,
    LayoutGrid,
    ListIcon,
    MailCheckIcon,
    MegaphoneIcon,
    Package2Icon,
    RssIcon,
    SettingsIcon,
    ShoppingBagIcon,
    UsersIcon,
    WalletIcon,
} from 'lucide-react';

export const mainNavItems: NavItem[] = [
    {
        title: 'Дашборд',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
];

export const eCommerceNavItems: NavItem[] = [
    {
        title: 'Категории',
        href: '/admin/categories',
        icon: ListIcon,
        items: [
            { title: 'Категория', href: '/admin/category' },
            { title: 'Подкатегории', href: '/admin/sub-category' },
            { title: 'Дочерняя категория', href: '/admin/child-category' },
        ],
    },
    {
        title: 'Товары',
        href: '/admin/products',
        icon: Package2Icon,
        items: [
            { title: 'Бренды', href: '/admin/brand' },
            { title: 'Товары', href: '/admin/products' },
            { title: 'Продукты продавцов', href: '/admin/seller-products' },
            { title: 'Продукты ожидают', href: '/admin/seller-pending-products' },
            { title: 'Отзывы', href: '/admin/reviews' },
        ],
    },
    {
        title: 'Заказы',
        href: '/admin/orders',
        icon: BaggageClaimIcon,
        items: [
            { title: 'Все заказы', href: '/admin/orders' },
            { title: 'Ожидающие заказы', href: '/admin/pending-orders' },
            { title: 'Обработанные заказы', href: '/admin/processed-orders' },
            { title: 'Выгруженные товары', href: '/admin/dropped-off-orders' },
            { title: 'Отправленные заказы', href: '/admin/shipped-orders' },
            { title: 'Заказы в пути', href: '/admin/out-for-delivery-orders' },
            { title: 'Доставленные заказы', href: '/admin/delivered-orders' },
            { title: 'Отменённые заказы', href: '/admin/canceled-orders' },
        ],
    },
    {
        title: 'Транзакции',
        href: '/admin/transactions',
        icon: BanknoteIcon,
    },
    {
        title: 'Э-коммерция',
        href: '/admin/flash-sale',
        icon: ShoppingBagIcon,
        items: [
            { title: 'Распродажа', href: '/admin/flash-sale' },
            { title: 'Купоны', href: '/admin/coupons' },
            { title: 'Правило доставки', href: '/admin/shipping-rule' },
            { title: 'Профиль продавца', href: '/admin/vendor-profile' },
            { title: 'Настройки платежа', href: '/admin/payment-settings' },
        ],
    },
    {
        title: 'Платёж',
        href: '/admin/withdraw-method',
        icon: WalletIcon,
        items: [
            { title: 'Тип платежа', href: '/admin/withdraw-method' },
            { title: 'Список снятия', href: '/admin/withdraw' },
        ],
    },
    {
        title: 'Управление сайтом',
        href: '/admin/slider',
        icon: SettingsIcon,
        items: [
            { title: 'Слайдер', href: '/admin/slider' },
            { title: 'Главная страница', href: '/admin/home-page-setting' },
            { title: 'Условия продавца', href: '/admin/vendor-condition' },
            { title: 'Условия и требования', href: '/admin/terms-and-conditions' },
            { title: 'О нас', href: '/admin/about' },
        ],
    },
    {
        title: 'Объявление',
        href: '/admin/advertisement',
        icon: MegaphoneIcon,
    },
    {
        title: 'Блог',
        href: '/admin/blog-category',
        icon: RssIcon,
        items: [
            { title: 'Категории блога', href: '/admin/blog-category' },
            { title: 'Публикации', href: '/admin/blog' },
            { title: 'Комментарии', href: '/admin/blog-comments' },
        ],
    },
];

export const settingsNavItems: NavItem[] = [
    {
        title: 'Footer',
        href: '/admin/footer-info',
        icon: FootprintsIcon,
        items: [
            { title: 'Footer инфо', href: '/admin/footer-info' },
            { title: 'Footer СоцСети', href: '/admin/footer-socials' },
            { title: 'Вторая колонка', href: '/admin/footer-grid-two' },
            { title: 'Третья колонка', href: '/admin/footer-grid-three' },
        ],
    },
    {
        title: 'Пользователи',
        href: '/admin/customer',
        icon: UsersIcon,
        items: [
            { title: 'Клиенты', href: '/admin/customer' },
            { title: 'Продавцы', href: '/admin/vendor-list' },
            { title: 'Ожидающие продавцы', href: '/admin/vendor-requests' },
            { title: 'Админы', href: '/admin/admin-list' },
            { title: 'Создать пользователя', href: '/admin/manage-user' },
        ],
    },
    {
        title: 'Рассылки',
        href: '/admin/subscribers',
        icon: MailCheckIcon,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'GitHub',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Документация',
        href: 'https://laravel.com/docs',
        icon: BookOpen,
    },
];
