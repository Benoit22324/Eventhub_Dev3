import { Dependencies } from "../../../store/dependencies";
import { AppDispatch, AppGetState } from "../../../store/store";
import { authSlice } from "../store/authSlice";

export const fetchMeAction = () => async (
    dispatch: AppDispatch,
    _: AppGetState,
    dependencies: Dependencies
) => {
    try {
        const result = await dependencies.fetchMe.fetchMe();

        dispatch(authSlice.actions.hydrateAuth(result));
    } catch (error) {
        dispatch(authSlice.actions.logout());
    }
}