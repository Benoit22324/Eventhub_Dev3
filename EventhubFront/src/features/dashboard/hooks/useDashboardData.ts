import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../store/store"
import { useEffect } from "react";
import { fetchViewsPerPage } from "../queries/fetchViewsPerPage";

export const useDashboardData = () => {
    const dispatch = useAppDispatch();

    const { data, status, error } = useSelector((state: AppState) => state.dashboard);

    useEffect(() => {
        dispatch(fetchViewsPerPage());
    }, [ dispatch ])

    return {
        data,
        status,
        error
    }
}