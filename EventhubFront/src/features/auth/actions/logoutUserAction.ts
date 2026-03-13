import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { authSlice } from "../store/authSlice";

export const logoutUserAction = () => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        await dependencies.logoutGateway.logout();

        dispatch(authSlice.actions.logout());
    } catch (error) {
        dispatch(authSlice.actions.logout());
    }
}