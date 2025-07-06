import { z } from "zod";

import { ROLES } from "@/constants/roles";

export const createMasterAdminSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.literal(ROLES.ADMIN),
    isActive: z.boolean().optional().default(true),
});

export const masterSetupSecretSchema = z.object({
    "x-master-secret-key": z.string().min(1, "Master setup secret is required"),
});

export type CreateMasterAdminInput = z.infer<typeof createMasterAdminSchema>;
export type MasterSetupSecretInput = z.infer<typeof masterSetupSecretSchema>; 