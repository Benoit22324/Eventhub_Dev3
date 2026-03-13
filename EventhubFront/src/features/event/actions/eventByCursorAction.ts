import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { eventSlice } from "../store/eventSlice";

export const eventByCursorAction = (lastId: string, limit: number) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(eventSlice.actions.EventByCursorLoading());

        const result = await dependencies.eventByCursorGateway.byCursor(lastId, limit);

        dispatch(eventSlice.actions.EventByCursorSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(eventSlice.actions.EventByCursorError(message));
    }
}