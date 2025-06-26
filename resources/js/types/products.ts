import { Brand } from './brand';

export type Product = {
    id: number;
    code: number;
    name: string;
    slug?: string;
    thumb_image: File | string;
    vendor_id?: number | null;
    category_id: number | null;
    sub_category_id: number | null;
    child_category_id: number | null;
    brand_id: number | null;
    qty: number;
    short_description: string;
    long_description: string;
    video_link?: string | null;
    link_source?: string | null;
    sku: string;
    price: number;
    cost_price?: number | null;
    offer_price?: number | null;
    offer_start_date?: Date | string | null;
    offer_end_date?: Date | string | null;
    product_type: string;
    status: boolean;
    is_approved: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    link_first?: string | null;
    created_at?: string;
    updated_at?: string;
    // Relations (optional if loaded)
    category?: { id: number; name: string };
    subCategory?: { id: number; name: string };
    childCategory?: { id: number; name: string };
    brand?: Brand;
    vendor?: { id: number; name: string };
    product_image_galleries?: { id: number; image: string }[];
    variants?: {
        id: number;
        name: string;
        product_id: number;
        status: boolean;
        variant_items?: {
            product_variant_id: number;
            name: string;
            price: number;
            is_default: boolean;
            status: boolean;
        }[];
    }[];
    reviews?: {
        id: number;
        rating: number;
        comment: string;
        user: { id: number; name: string };
    }[];
};
