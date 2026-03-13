import type { Dependencies } from "../../../store/dependencies";
import type { AppDispatch, AppGetState } from "../../../store/store";
import * as AnalyticsModel from "../model/analyticsModel";
import { analyticsSlice } from "../store/analyticsSlice";

export const sendAnalyticsAction = (event: AnalyticsModel.AnalyticsEvent) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(analyticsSlice.actions.sendAnalyticsLoading());

        await dependencies.analyticsGateway.sendAnalytics(event);

        dispatch(analyticsSlice.actions.sendAnalyticsSuccess());
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(analyticsSlice.actions.sendAnalyticsError(message));
    }
}