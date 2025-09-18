import { BaseRepository } from "./base.repo";

import prisma from "@/config/database";

export class RoleRepository extends BaseRepository<"roles"> {
    constructor() {
        super(prisma.roles);
    }
}