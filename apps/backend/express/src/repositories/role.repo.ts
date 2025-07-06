import { BaseRepository } from "./base.repo";

import prisma from "@/config/database";

export class RoleRepository extends BaseRepository<"roles"> {
    constructor() {
        super(prisma.roles);
    }

    async findByName(name: string) {
        return this.model.findFirst({ where: { name } });
    }

    public async createRole(name: string) {
        return this.model.create({ data: { name } });
    }
}