export interface ProductInterface {
    id: number;
    title: string;
    image: string;
    stock: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryInterface{
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
}