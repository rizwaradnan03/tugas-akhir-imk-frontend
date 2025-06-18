export interface ProductInterface {
    id: number;
    title: string;
    category_id: number;
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

export interface UserPaymentInterface {
    id: number;
    order_id: number;
    status: string;
    email: string;
    alamat: string;
    product_id: number;
    amount: number;
    payment_method: string | null;
    is_shipped: number;
    created_at: Date;
    updated_at: Date;
}

export interface UserInterface {
    id: number;
    email: string;
    created_at: Date;
    updated_at: Date;
}