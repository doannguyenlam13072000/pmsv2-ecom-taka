import { ACCOUNT_ERROR_CODES, ACCOUNT_MESSAGES } from "./account.constant";

import { AccountRepository } from "@/repositories/account.repo";
import { AccountWithRole } from "@/types/entities/Account";
import { ApiError } from "@/utils/errors";


export class AccountService {
    private readonly accountRepository: AccountRepository;

    constructor() {
        this.accountRepository = new AccountRepository();
    }

    async getAccountByEmail(email: string): Promise<AccountWithRole> {
        const account = await this.accountRepository.findByEmail(email);

        if (!account) {
            throw ApiError.notFound(ACCOUNT_MESSAGES.NOT_FOUND, ACCOUNT_ERROR_CODES.NOT_FOUND);
        }

        return account;
    }
}