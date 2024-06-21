import { z } from 'zod';

export const registerValidator = z.object({
    username: z.string()
                .min(3, {message: 'Username should contain at least 3 characters'})
                .max(20, {message: 'Username should not exceed 20 characters'})
                .regex(/^(?=.*[-+_!@#$%^&*.,?])/, { message: 'Username should not contain any special characters'})
    ,
    email: z.string()
                .email()

    ,
    password: z.string()
                .min(8, {message: 'Password should contain at least 8 characters'})
                .max(32, {message: 'Password should not exceed 32 characters'})
                .regex(/(?=.*\d)/, { message: 'Password should include at least 1 digit'})
                .regex(/(?=.*[a-z])/, { message: 'Password should include at least 1 lowercase character'})
                .regex(/(?=.*[A-Z])/, { message: 'Password should include at least 1 uppercase character'})
                .regex(/(?=.*[-+_!@#$%^&*.,?])/, { message: 'Password should include at least 1 special character'})
})