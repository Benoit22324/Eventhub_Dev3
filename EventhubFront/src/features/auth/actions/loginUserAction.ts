import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import * as AuthModel from "../domain/model/authModel";
import { authSlice } from "../store/authSlice";

export const loginUserAction = (data: AuthModel.LoginForm) => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        dispatch(authSlice.actions.loginUserLoading());

        const result = await dependencies.loginGateway.login(data);

        dispatch(authSlice.actions.loginUserSuccess(result));
    } catch (error) {
        let message = "Une erreur est survenue";

        if (error instanceof Error) message = error.message;

        dispatch(authSlice.actions.loginUserError(message));
    }
}