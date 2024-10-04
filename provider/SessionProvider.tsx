"use client";

import { useAppSelector } from "@/hooks/redux";
import { account } from "@/lib/appwrite";
import React from "react";

export default function SessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAppSelector((state) => state.user);

    React.useEffect(() => {
        async () => {
            if (isAuthenticated) {
                return;
            }
            try {
                const data = await account.getSession("current");
                if (data) {
                    console.log(data);
                }
            } catch (error) {
                error instanceof Error && console.log(error);
            }
        };
    }, [isAuthenticated]);
    return <>{children}</>;
}
