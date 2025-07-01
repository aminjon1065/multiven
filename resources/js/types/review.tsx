export type Review = {
    id: number;
    product_id: number;
    rating: string;
    review: string;
    status: boolean;
    user_id: number;
    vendor_id: number;
    created_at: Date | string;
    updated_at: Date | string;
    product: {
        id: number;
        name: string;
    };
    vendor: {
        id: number;
        shop_name: string;
    };
    user: {
        id: number;
        name: string;
    };
};
