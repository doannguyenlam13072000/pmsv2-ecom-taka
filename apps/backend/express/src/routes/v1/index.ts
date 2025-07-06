import { Router } from "express";

const router: Router = Router();

import accountRoute from "@/modules/account/account.route";
import internalRoute from "@/modules/internals/internals.routes";

router.use('/accounts', accountRoute);
router.use('/internals', internalRoute);

export default router;
