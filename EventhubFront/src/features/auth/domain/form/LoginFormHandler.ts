import * as AuthModel from "../model/authModel";
import { LoginSchema } from "../schema/loginSchema";

type ValidationError = Partial<Record<keyof AuthModel.LoginForm, string>>;
type ValidateOutput = {
    isValid: boolean,
    errors: ValidationError
}

export class LoginFormHandler {
    isSubmittable(data: AuthModel.LoginForm) {
        return Object.values(data).every(value => value.trim().length > 0);
    }

    validate(data: AuthModel.LoginForm): ValidateOutput {
        const result = LoginSchema.safeParse(data);

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