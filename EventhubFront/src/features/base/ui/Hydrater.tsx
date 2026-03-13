import type React from "react";
import { useHydrateAuth } from "../../auth/hooks/useHydrateAuth";

export const Hydrater: React.FC<{children: React.ReactNode}> = ({ children }) => {
    useHydrateAuth();

    return <>
        {children}
    </>
}