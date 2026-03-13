import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as AuthModel from "../domain/model/authModel";

export type AuthState = {
    status: "idle" | "loading" | "success" | "error",
    user: AuthModel.User,
    error: string | null,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    status: "idle",
    user: {
        id: "",
        username: "",
        email: "",
        otpEnable: false,
        role: "user"
    },
    error: null,
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerUserLoading: (state) => {
            state.status = "loading"
            state.error = null
        },
        registerUserSuccess: (state) => {
            state.status = "success"
            state.error = null
        },
        registerUserError: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        },

        loginUserLoading: (state) => {
            state.status = "loading"
            state.error = null
        },
        loginUserSuccess: (state, action: PayloadAction<AuthModel.User>) => {
            state.status = "success"
            state.user = action.payload
            state.error = null
            state.isAuthenticated = true
        },
        loginUserError: (state, action: PayloadAction<string>) => {
            state.status = "error"
            state.error = action.payload
        },

        hydrateAuth: (state, action: PayloadAction<AuthModel.User>) => {
            state.status = "success"
            state.user = action.payload
            state.error = null
            state.isAuthenticated = true
        },

        logout: (state) => {
            state.status = "idle"
            state.user.id = ""
            state.user.username = ""
            state.user.email = ""
            state.user.otpEnable = false
            state.user.role = "user"
            state.error = null
            state.isAuthenticated = false
        }
    }
})