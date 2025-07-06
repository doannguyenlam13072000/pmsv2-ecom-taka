import { AccountPayload } from "@/modules/internals/internals.types";
import prisma from "@/config/database";
import { AccountWithRole } from "@/types/entities/Account";

export class AccountRepository {


    async findById(id: number): Promise<AccountWithRole> {
        return await prisma.accounts.findUnique({
            where: { id, deletedAt: null },
            include: { role: true }
        }) as unknown as AccountWithRole;
    }

    async findByEmail(email: string): Promise<AccountWithRole> {
        return await prisma.accounts.findUnique({
            where: {
                email,
                deletedAt: null
            }
        }) as unknown as AccountWithRole;
    }

    async findByUsername(email: string): Promise<unknown> {
        return prisma.accounts.findUnique({
            where: { email, deletedAt: null }
        });
    }

    async createAccount(data: AccountPayload): Promise<AccountWithRole> {
        return prisma.accounts.create({ data, include: { role: true } }) as unknown as AccountWithRole;
    }

    async softDeleteById(id: number) {
        return prisma.accounts.update({ where: { id }, data: { deletedAt: new Date() } });
    }
}