import React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { useTrackPageView } from "../../analytics/hooks/useTrackPageView";

export const Layout: React.FC = () => {
    const location = useLocation();
    useTrackPageView(location.pathname);

    return <>
        <div className="flex flex-col justify-center items-center gap-2 h-screen bg-gray-100">
            <Header />
            <Outlet />
        </div>
    </>
}