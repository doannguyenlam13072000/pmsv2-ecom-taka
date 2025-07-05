import type { RequestHandler } from "express";

import { AccountService } from "./account.service";
import { ACCOUNT_MESSAGES, ACCOUNT_ERROR_CODES } from "./account.constant";

import { HTTP_CODE } from "@/constants/httpCode";
import { successResponse, notFoundError } from "@/utils/response";

export class AccountController {
    private readonly accountService: AccountService;
    private readonly resource: string = "Accounts";

    constructor() {
        this.accountService = new AccountService();
    }

    public getAccountByEmail: RequestHandler = async (req, res, next) => {
        try {
            const { email } = req.params as { email: string };

            const account = await this.accountService.findAccountByEmail(email);

            if (!account) {
                res.status(HTTP_CODE.NOT_FOUND).json(
                    notFoundError(this.resource, ACCOUNT_ERROR_CODES.NOT_FOUND)
                );
                return;
            }

            res.status(HTTP_CODE.OK).json(
                successResponse(account, HTTP_CODE.OK, ACCOUNT_MESSAGES.RETRIEVED)
            );
        } catch (error) {
            next(error);
        }
    };
}
