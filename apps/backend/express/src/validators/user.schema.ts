import { z } from 'zod';

// User creation schema
export const createUserSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    age: z.number().min(18, 'Must be at least 18 years old').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

// User update schema
export const updateUserSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    age: z.number().min(18, 'Must be at least 18 years old').optional()
});


// User ID parameter schema
export const userIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number')
}); 