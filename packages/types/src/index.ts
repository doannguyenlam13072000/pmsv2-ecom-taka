export interface User {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'admin' | 'user' | 'guest';
    createdAt: Date;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: string;
}

export type ErrorResponse = {
    error: string;
    code: number;
    details?: string;
};