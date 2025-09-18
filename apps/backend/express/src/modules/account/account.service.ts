import { AccountRepository } from "@/repositories/account.repo";

export class AccountService {
    private readonly accountRepository: AccountRepository;

    constructor() {
        this.accountRepository = new AccountRepository();
    }

    /**
     * Create a new account
     * 
     * @param data 
     * @returns 
     */
    async createAccount(data: Record<string, unknown>): Promise<unknown> {
        return this.accountRepository.create(data);
    }

    /**
     * Find an account by ID
     * 
     * @param id 
     * @returns 
     */
    async findAccountById(id: number | bigint): Promise<unknown> {
        return this.accountRepository.findById(id);
    }

    /**
     * Find an account by email
     * 
     * @param email 
     * @returns 
     */
    async findAccountByEmail(email: string): Promise<unknown> {
        return this.accountRepository.findByEmail(email);
    }

    /**
     * Find an account by username
     * 
     * @param username 
     * @returns 
     */
    async findAccountByUsername(username: string): Promise<unknown> {
        return this.accountRepository.findByUsername(username);
    }
}