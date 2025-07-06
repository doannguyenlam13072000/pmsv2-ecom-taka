import type { RequestHandler } from "express";

import { AccountService } from "./account.service";
import { ACCOUNT_MESSAGES } from "./account.constant";

import { HTTP_CODE } from "@/constants/httpCode";
import { successResponse } from "@/utils/response";

export class AccountController {
    private readonly accountService: AccountService;

    constructor() {
        this.accountService = new AccountService();
    }

    public getAccountByEmail: RequestHandler = async (req, res, next) => {
        try {
            const { email } = req.params as { email: string };

            const account = await this.accountService.getAccountByEmail(email);

            res.status(HTTP_CODE.OK).json(
                successResponse(account, HTTP_CODE.OK, ACCOUNT_MESSAGES.RETRIEVED)
            );
        } catch (error) {
            next(error);
        }
    };
}
