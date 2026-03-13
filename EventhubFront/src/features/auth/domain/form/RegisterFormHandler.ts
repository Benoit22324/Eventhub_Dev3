import * as AuthModel from "../model/authModel";
import { RegisterSchema } from "../schema/registerSchema";

type ValidationError = Partial<Record<keyof AuthModel.RegisterForm, string>>;
type ValidateOutput = {
    isValid: boolean,
    errors: ValidationError
}

export class RegisterFormHandler {
    isSubmittable(data: AuthModel.RegisterForm) {
        return Object.values(data).every(value => value.trim().length > 0);
    }

    validate(data: AuthModel.RegisterForm): ValidateOutput {
        const result = RegisterSchema.safeParse(data);

        if (result.success) return {
            isValid: true,
            errors: {}
        };

        const errorsArray = JSON.parse(result.error.message).map((err: any) => ([err.path[0], err.message]));
        const errors = Object.fromEntries(errorsArray) as ValidationError;

        return {
            isValid: false,
            errors
        }
    }
}