import { Role } from "./Role";

export interface Account {
    id: number;
    email: string;
    password: string;
    roleId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AccountWithRole extends Account {
    role: Role;
}