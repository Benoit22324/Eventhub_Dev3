import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { eventSlice } from "../store/eventSlice";

export const eventByOffsetAction = (page: number, limit: number) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(eventSlice.actions.EventByOffsetLoading());

        const result = await dependencies.eventByOffsetGateway.byOffset(page, limit);

        dispatch(eventSlice.actions.EventByOffsetSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(eventSlice.actions.EventByOffsetError(message));
    }
}