import { TypeProduct } from '@/types/enums/type-products';
import { Brand } from './brand';

export type Product = {
    id: number;
    code: string;
    name: string;
    slug: string;
    thumb_image: File | string;
    vendor_id: number | null;
    category_id: number | null;
    sub_category_id: number | null;
    child_category_id: number | null;
    brand_id: number | null;
    qty: number;
    short_description: string;
    long_description: string;
    video_link: string | null;
    link_source: string | null;
    sku: string | null;
    price: number;
    cost_price: number;
    offer_price: number | null;
    offer_start_date: string | null;
    offer_end_date: string | null;
    product_type: TypeProduct | string;
    status: boolean;
    is_approved: boolean;
    seo_title: string | null;
    seo_description: string | null;
    link_first: string | null;
    created_at: string;
    updated_at: string;
    // Relations (optional if loaded)
    category?: { id: number; name: string };
    subCategory?: { id: number; name: string };
    childCategory?: { id: number; name: string };
    brand?: Brand;
    vendor?: { id: number; name: string };
    productImageGalleries?: { id: number; image: string }[];
    variants?: {
        id: number;
        name: string;
        price: number;
        stock: number;
    }[];
    reviews?: {
        id: number;
        rating: number;
        comment: string;
        user: { id: number; name: string };
    }[];
};
