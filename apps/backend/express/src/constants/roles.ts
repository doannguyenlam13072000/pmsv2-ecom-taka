export enum ROLES {
    ADMIN = "ADMIN",
    SUPPORT_WORKER = "SUPPORT_WORKER",
    HR = "HR"
}

export const ROLE_DISPLAY_NAMES = {
    [ROLES.ADMIN]: "Admin",
    [ROLES.SUPPORT_WORKER]: "Support Worker",
    [ROLES.HR]: "HR"
} as const;

export const ROLE_DESCRIPTIONS = {
    [ROLES.ADMIN]: "Admin",
    [ROLES.SUPPORT_WORKER]: "Support Worker",
    [ROLES.HR]: "HR"
} as const;