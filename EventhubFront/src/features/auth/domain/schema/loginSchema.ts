import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Veuillez saisir un email valide"),
    password: z.string().min(6, "Veuillez saisir au moins 6 caractères")
});

export type LoginFormSchema = z.infer<typeof LoginSchema>;