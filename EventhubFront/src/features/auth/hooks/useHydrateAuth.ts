import { useEffect } from "react";
import { useAppDispatch } from "../../../store/store"
import { fetchMeAction } from "../actions/fetchMeAction";

export const useHydrateAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMeAction());
    }, [ dispatch ])
}