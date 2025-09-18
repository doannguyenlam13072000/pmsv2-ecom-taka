import { Router } from "express";

import { AccountController } from "./account.ctrl";

import { validateParams } from "@/middleware/validation";
import {
    emailSchema
} from "@/validators/common.schema";

const router: Router = Router();
const accountController = new AccountController();

router.get("/:email",
    validateParams(emailSchema),
    accountController.getAccountByEmail
);

export default router;