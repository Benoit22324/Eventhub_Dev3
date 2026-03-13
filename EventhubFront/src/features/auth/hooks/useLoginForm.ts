import { FieldValues, useForm } from "react-hook-form";
import * as AuthModel from "../domain/model/authModel";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../store/store";
import { loginUserAction } from "../actions/loginUserAction";
import { useRef } from "react";
import { LoginFormHandler } from "../domain/form/LoginFormHandler";

export const useLoginForm = () => {
    function isSubmittable() {
        const data = {
            email: watch("email"),
            password: watch("password")
        }

        if (data.email === undefined || data.password === undefined) return

        return loginForm.current.isSubmittable(data);
    }

    function submit(values: FieldValues) {
        const data = values as AuthModel.LoginForm;

        const valid = loginForm.current.validate(data);

        if (!valid.isValid) {
            Object.entries(valid.errors).forEach(([key, value]) => setError(key, { message: value }));
            return
        }

        dispatch(loginUserAction(data));
    }

    const dispatch = useAppDispatch();
    const networkError = useSelector((state: AppState) => state.auth.error);
    const loginForm = useRef(new LoginFormHandler());
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        watch
    } = useForm();

    return {
        control,
        handleSubmit,
        errors,
        submit,
        isSubmittable: isSubmittable(),
        networkError
    }
}