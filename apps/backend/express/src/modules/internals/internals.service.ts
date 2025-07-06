import bcryptjs from "bcryptjs";

import { INTERNAL_MESSAGES, INTERNAL_ERROR_CODES } from "./internals.constant";
import { AccountResponse, CreateAccountRequest } from "./internals.types";

import { env } from "@/config/env";
import { ROLES } from "@/constants/roles";
import { AccountRepository } from "@/repositories/account.repo";
import { RoleRepository } from "@/repositories/role.repo";
import { ApiError } from "@/utils/errors";
import { AccountWithRole } from "@/types/entities/Account";

const accountRepo = new AccountRepository();
const roleRepo = new RoleRepository();

export class InternalService {

    /**
     * Create a master admin account
     */
    static async createMasterAdmin(
        data: CreateAccountRequest
    ): Promise<AccountResponse> {
        try {
            // Fetch admin role (must exist, seeded)
            const adminRole = await roleRepo.findByName(ROLES.ADMIN);
            if (!adminRole) {
                throw ApiError.notFound(INTERNAL_MESSAGES.ACCOUNT_NOT_FOUND, INTERNAL_ERROR_CODES.ACCOUNT_NOT_FOUND, {
                    resources: ["/internal/admin"]
                });
            }

            // Check if account already exists
            const existingAccount = await accountRepo.findByEmail(data.email);
            if (existingAccount) {
                throw ApiError.conflict(INTERNAL_MESSAGES.ACCOUNT_ALREADY_EXISTS, INTERNAL_ERROR_CODES.ACCOUNT_ALREADY_EXISTS);
            }

            // Hash password
            const hashedPassword = await bcryptjs.hash(data.password, env.BCRYPT_ROUNDS);

            // Create the account
            const account: AccountWithRole = await accountRepo.createAccount({
                email: data.email,
                password: hashedPassword,
                roleId: Number(adminRole.id),
                isActive: data.isActive ?? true,
            });

            return {
                id: Number(account.id),
                email: account.email,
                role: account.role.name,
                isActive: account.isActive,
                createdAt: account.createdAt,
            };
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.internal(INTERNAL_MESSAGES.CREATE_MASTER_ADMIN_FAILED, INTERNAL_ERROR_CODES.INTERNAL_SERVICE_ERROR);
        }
    }

    /**
     * Delete an admin account (for internal use only)
     */
    static async deleteAdminAccount(accountId: number): Promise<void> {
        try {
            const account: AccountWithRole = await accountRepo.findById(accountId);
            if (!account) {
                throw ApiError.notFound(INTERNAL_MESSAGES.ACCOUNT_NOT_FOUND, INTERNAL_ERROR_CODES.ACCOUNT_NOT_FOUND);
            }

            await accountRepo.softDeleteById(accountId);
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw ApiError.internal(INTERNAL_MESSAGES.DELETE_ADMIN_ACCOUNT_FAILED, INTERNAL_ERROR_CODES.INTERNAL_SERVICE_ERROR);
        }
    }
} 