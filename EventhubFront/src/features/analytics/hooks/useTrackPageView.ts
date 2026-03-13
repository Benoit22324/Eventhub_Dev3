import { useEffect } from "react";
import { AppState, useAppDispatch } from "../../../store/store"
import { sendAnalyticsAction } from "../actions/sendAnalyticsAction";
import { useSelector } from "react-redux";

export const useTrackPageView = (page: string) => {
    const dispatch = useAppDispatch();
    const { id } = useSelector((state: AppState) => state.auth.user);

    useEffect(() => {
        dispatch(sendAnalyticsAction({
            eventName: "pageview",
            userId: id.length > 0 ? id : "guest",
            page,
            timestamp: new Date()
        }));
    }, [ dispatch, page ]);
}