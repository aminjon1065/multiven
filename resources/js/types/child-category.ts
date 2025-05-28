export type ChildCategory = {
    id: number;
    category_id: string;
    sub_category_id: string;
    name: string;
    slug: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    category: {
        id: number;
        name: string;
    };
    sub_category: {
        id: number;
        name: string;
    };
};
