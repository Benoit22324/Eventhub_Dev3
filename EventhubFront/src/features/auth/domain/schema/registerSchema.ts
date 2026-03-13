import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string().min(2, "Veuillez saisir au moins 2 caractères"),
    email: z.string().email("Veuillez saisir un email valide"),
    password: z.string().min(6, "Veuillez saisir au moins 6 caractères")
});

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;