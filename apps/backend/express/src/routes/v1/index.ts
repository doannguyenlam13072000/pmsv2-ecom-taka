import { Router } from "express";

const router: Router = Router();

import accountRoute from "@/modules/account/account.route";

router.use('/accounts', accountRoute)

export default router;
