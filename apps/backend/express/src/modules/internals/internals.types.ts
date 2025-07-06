export interface CreateAccountRequest {
    email: string;
    password: string;
    roleId: number;
    isActive?: boolean;
}

export interface AccountResponse {
    id: number;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
}

export interface AccountPayload {
    email: string;
    password: string;
    roleId: number;
    isActive: boolean;
}