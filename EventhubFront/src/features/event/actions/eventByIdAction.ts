import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { eventSlice } from "../store/eventSlice";

export const eventByIdAction = (id: string) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(eventSlice.actions.EventByIdLoading());

        const result = await dependencies.eventByIdGateway.byId(id);

        dispatch(eventSlice.actions.EventByIdSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(eventSlice.actions.EventByIdError(message));
    }
}