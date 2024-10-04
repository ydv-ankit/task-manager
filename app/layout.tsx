import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/provider/QueryProvider";
import SessionProvider from "@/provider/SessionProvider";
import StoreProvider from "@/provider/StoreProvider";

export const metadata: Metadata = {
    title: "Task Manager",
    description: "Manage all your tasks at one place",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[rgb(0,20,48)] text-white">
                <StoreProvider>
                    <SessionProvider>
                        <QueryProvider>
                            {children}
                            <Toaster />
                        </QueryProvider>
                    </SessionProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
