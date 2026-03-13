import { useAppDispatch } from "../../../store/store"
import { logoutUserAction } from "../actions/logoutUserAction";

export const useLogout = () => {
    const dispatch = useAppDispatch();

    function logout() {
        dispatch(logoutUserAction());
    }

    return {
        logout
    }
}