import { FieldValues, useForm } from "react-hook-form";
import * as AuthModel from "../domain/model/authModel";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../store/store";
import { useEffect, useRef, useState } from "react";
import { registerUserAction } from "../actions/registerUserAction";
import { RegisterFormHandler } from "../domain/form/RegisterFormHandler";

export const useRegisterForm = () => {
    function isSubmittable() {
        const data = {
            username: watch("username"),
            email: watch("email"),
            password: watch("password")
        }

        if (data.username === undefined || data.email === undefined || data.password === undefined) return

        return registerForm.current.isSubmittable(data);
    }

    function submit(values: FieldValues) {
        const data = values as AuthModel.RegisterForm;

        const valid = registerForm.current.validate(data);

        if (!valid.isValid) {
            Object.entries(valid.errors).forEach(([key, value]) => setError(key, { message: value }));
            return
        }

        dispatch(registerUserAction(data));
    }

    const dispatch = useAppDispatch();
    const [ isSaved, setIsSaved ] = useState<boolean>(false);
    const status = useSelector((state: AppState) => state.auth.status);
    const networkError = useSelector((state: AppState) => state.auth.error);
    const registerForm = useRef(new RegisterFormHandler());
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        watch
    } = useForm();

    useEffect(() => {
        if (status === "success") {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 5000);
        }
    }, [ status ])

    return {
        control,
        handleSubmit,
        errors,
        submit,
        isSubmittable: isSubmittable(),
        networkError,
        isSaved
    }
}