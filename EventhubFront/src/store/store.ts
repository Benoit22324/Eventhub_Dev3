import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { Dependencies } from "./dependencies";
import { authSlice } from "../features/auth/store/authSlice";
import { eventSlice } from "../features/event/store/eventSlice";
import { analyticsSlice } from "../features/analytics/store/analyticsSlice";
import { dashboardSlice } from "../features/dashboard/store/dashboardSlice";

const reducers = combineReducers({
    auth: authSlice.reducer,
    event: eventSlice.reducer,
    analytics: analyticsSlice.reducer,
    dashboard: dashboardSlice.reducer
});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];


export const createStore = (config: {
    dependencies: Dependencies;
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies,
                }
            })
        }
    })

    return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();