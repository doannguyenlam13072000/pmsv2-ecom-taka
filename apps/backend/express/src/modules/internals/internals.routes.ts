import { Router } from "express";

import { InternalController } from "./internals.ctrl";
import { validateMasterSetupSecret, logInternalApiAccess } from "./internals.middleware";
import { createMasterAdminSchema } from "./internals.schema";

import { validateBody } from "@/middleware/validation";

const router: Router = Router();

router.use(logInternalApiAccess);

// Create master admin account with body validation
router.post(
    "/admin",
    validateMasterSetupSecret,
    validateBody(createMasterAdminSchema),
    InternalController.createMasterAdmin
);

// Delete admin account
router.delete(
    "/admin/:id",
    validateMasterSetupSecret,
    InternalController.deleteAdminAccount
);

export default router;
