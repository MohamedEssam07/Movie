import { z } from "zod"

export const loginSchema = z.object({
    identifier: z.string().email(),
    password: z.string().min(3, { message: "min is 3" }).max(12, { message: "max is 12" }),

})


export const registerSchema = z.object({
    username: z.string().min(3).max(10),
    email: z.string().email(),
    password: z.string().min(3, { message: "min is 3" }).max(12, { message: "max is 12" }),

})


export type loginFormData = z.infer<typeof loginSchema>
export type registerFormData = z.infer<typeof registerSchema>