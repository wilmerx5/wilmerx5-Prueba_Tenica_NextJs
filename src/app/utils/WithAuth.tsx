"use client";
import { ReactNode, useEffect, useState } from "react";
import authApi from "../services/API/authApi";

interface WithAuthProtectProps {
    children: ReactNode;
}

const WithAuthProtect: React.FC<WithAuthProtectProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('AUTHTOKEN');
            if (!token) {
                window.location.href = "/auth/login";
                return;
            }

            try {
                await authApi.getUser(token);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Authentication failed:", error);
                window.location.href = "/auth/login";
            }
        };

        checkAuthentication();
    }, []);

    return isAuthenticated ? <>{children}</> : null;
};

export default WithAuthProtect;