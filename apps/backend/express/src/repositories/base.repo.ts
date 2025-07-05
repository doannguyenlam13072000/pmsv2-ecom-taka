/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/config/database";

export class BaseRepository<T extends keyof typeof prisma> {
    constructor(protected readonly model: typeof prisma[T]) { }

    async findById(id: number | bigint): Promise<unknown> {
        return (this.model as unknown as any).findUnique({
            where: { id, deletedAt: null }
        });
    }

    async findAll(args: Record<string, unknown> = {}): Promise<unknown[]> {
        return (this.model as unknown as any).findMany(args);
    }

    async delete(id: number | bigint): Promise<unknown> {
        return (this.model as unknown as any).delete({ where: { id } });
    }

    async create(data: Record<string, unknown>): Promise<unknown> {
        return (this.model as unknown as any).create({ data });
    }

    async update(id: number | bigint, data: Record<string, unknown>): Promise<unknown> {
        return (this.model as unknown as any).update({ where: { id }, data });
    }
}