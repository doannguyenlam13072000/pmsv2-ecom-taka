import { BaseRepository } from "./base.repo";

import prisma from "@/config/database";

export class AccountRepository extends BaseRepository<"accounts"> {
    constructor() {
        super(prisma.accounts);
    }

    async findByEmail(email: string): Promise<unknown> {
        return email;
    }

    async findByUsername(email: string): Promise<unknown> {
        return email;
    }
}