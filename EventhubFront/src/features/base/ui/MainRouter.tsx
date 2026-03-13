import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"
import { LoginForm } from "../../auth/ui/LoginForm";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import { RegisterForm } from "../../auth/ui/RegisterForm";
import { lazy } from "react";

const EventList = lazy(() => import("../../event/ui/EventsList"));
const Event = lazy(() => import("../../event/ui/Event"));
const AnalyticsDashboard = lazy(() => import("../../dashboard/ui/AnalyticsDashboard"));

export const MainRouter = () => {
    const { isAuthenticated } = useSelector((state: AppState) => state.auth);
    const { role } = useSelector((state: AppState) => state.auth.user);

    return <>
        <Routes>
            <Route element={<Layout />}>
                {
                    !isAuthenticated ? <>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />

                        <Route path="*" element={<Navigate to={"/login"} replace />} />
                    </>
                    : <>
                        <Route path="/events" element={<EventList />} />
                        <Route path="/event/:id" element={<Event />} />

                        {
                            role === "admin" && <Route path="/dashboard" element={<AnalyticsDashboard />} />
                        }

                        <Route path="*" element={<Navigate to={"/events"} replace />} />
                    </>
                }
                
            </Route>
            {/* <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/a2f" element={<A2FPage />} /> */}
        </Routes>
    </>
}