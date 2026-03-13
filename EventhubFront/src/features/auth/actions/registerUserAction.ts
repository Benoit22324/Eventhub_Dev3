import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import * as AuthModel from "../domain/model/authModel";
import { authSlice } from "../store/authSlice";

export const registerUserAction = (data: AuthModel.RegisterForm) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(authSlice.actions.registerUserLoading());

        await dependencies.registerGateway.register(data);

        dispatch(authSlice.actions.registerUserSuccess());
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(authSlice.actions.registerUserError(message));
    }
}