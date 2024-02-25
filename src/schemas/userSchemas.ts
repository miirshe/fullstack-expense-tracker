import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({
        invalid_type_error: "email is required"
    }).email({message: "invalid email"}),
    password: z.string({
        invalid_type_error: "password is required"
    }).min(8,{message : "must be 8 or more characters long"})
})

export const registerSchema = z.object({
    username: z.string({
        invalid_type_error: "username is required"
    }),
    email: z.string({
        invalid_type_error: "email is required"
    }).email({message : "invalid email"}),
    password: z.string({ invalid_type_error: "password is required" })
    .min(8,{message : "must be 8 or more characters long"})
})