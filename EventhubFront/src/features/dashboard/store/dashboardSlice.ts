import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import * as DashboardModel from "../model/dashboardModel"

export type DashboardState = {
    status: "idle" | "loading" | "success" | "error",
    data: {
        pages: DashboardModel.PageViewData[],
        users: DashboardModel.PageViewData[]
    },
    error: string | null
}

const initialState: DashboardState = {
    status: "idle",
    data: {
        pages: [],
        users: [],
    },
    error: null
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        fetchViewsLoading: (state) => {
            state.status = "loading",
            state.error = null
        },
        fetchViewsSuccess: (state, action: PayloadAction<{
            pages: DashboardModel.PageViewData[],
            users: DashboardModel.PageViewData[]
        }>) => {
            state.status = "success",
            state.data.pages = action.payload.pages,
            state.data.users = action.payload.users,
            state.error = null
        },
        fetchViewsError: (state, action: PayloadAction<string>) => {
            state.status = "error",
            state.error = action.payload
        }
    }
})