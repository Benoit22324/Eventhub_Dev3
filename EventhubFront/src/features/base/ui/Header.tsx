import { useSelector } from "react-redux"
import { AppState } from "../../../store/store"
import { Link } from "react-router-dom";
import { useLogout } from "../../auth/hooks/useLogout";

export const Header = () => {
    const logoutHook = useLogout();
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);
    const { role } = useSelector((state: AppState) => state.auth.user);

    return <>
        <div className="absolute top-20 flex items-center gap-4 py-2 px-4 bg-zinc-800 text-zinc-100 rounded-lg">
            {
                !isAuthenticated ? <>
                    <Link to={"/login"} className="px-1 py-1 rounded-lg hover:bg-zinc-600">Connexion</Link>
                    <Link to={"/register"} className="px-1 py-1 rounded-lg hover:bg-zinc-600">Inscription</Link>
                </>
                : <>
                    <Link to={"/events"} className="px-1 py-1 rounded-lg hover:bg-zinc-600">Évènement</Link>

                    {
                        role === "admin" && <Link to={"/dashboard"} className="px-1 py-1 rounded-lg hover:bg-zinc-600">Dashboard</Link>
                    }

                    <button onClick={logoutHook.logout} className="px-1 py-1 text-red-600 rounded-lg hover:cursor-pointer hover:bg-red-400/30">Déconnexion</button>
                </>
            }
        </div>
    </>
}