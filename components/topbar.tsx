"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

enum Tab {
    All = "all",
    Todo = "todo",
    InProgress = "in_progress",
    Completed = "completed",
}

export const Topbar = () => {
    const [currentTab, setCurrentTab] = React.useState<Tab>(Tab.All);
    const router = useRouter();

    const tab = useSearchParams().get("tab");

    React.useEffect(() => {
        if (tab === null || tab === "all") setCurrentTab(Tab.All);
        else if (tab === "todo") setCurrentTab(Tab.Todo);
        else if (tab === "in_progress") setCurrentTab(Tab.InProgress);
        else if (tab === "completed") setCurrentTab(Tab.Completed);
    }, [tab]);

    const setTabNavigation = (tab: Tab) => {
        if (tab === Tab.All) {
            router.push("?tab=all");
        } else if (tab === Tab.Todo) {
            router.push("?tab=todo");
        } else if (tab === Tab.InProgress) {
            router.push("?tab=in_progress");
        } else if (tab === Tab.Completed) {
            router.push("?tab=completed");
        }
    };

    return (
        <div className="w-full p-2 flex items-center justify-center border-b border-blue-700">
            <div className="flex items-center justify-center gap-2">
                <div
                    className={cn(
                        currentTab === Tab.All ? "bg-violet-500" : "",
                        "w-40 flex justify-center items-center rounded-md p-1 cursor-pointer hover:bg-violet-500",
                    )}
                    onClick={() => setTabNavigation(Tab.All)}
                >
                    All
                </div>
                <div
                    className={cn(
                        currentTab === Tab.Todo ? "bg-violet-500" : "",
                        "w-40 flex justify-center items-center rounded-md p-1 cursor-pointer hover:bg-violet-500",
                    )}
                    onClick={() => setTabNavigation(Tab.Todo)}
                >
                    Todo
                </div>
                <div
                    className={cn(
                        currentTab === Tab.InProgress ? "bg-violet-500" : "",
                        "w-40 flex justify-center items-center rounded-md p-1 cursor-pointer hover:bg-violet-500",
                    )}
                    onClick={() => setTabNavigation(Tab.InProgress)}
                >
                    In Progress
                </div>
                <div
                    className={cn(
                        currentTab === Tab.Completed ? "bg-violet-500" : "",
                        "w-40 flex justify-center items-center rounded-md p-1 cursor-pointer hover:bg-violet-500",
                    )}
                    onClick={() => setTabNavigation(Tab.Completed)}
                >
                    Completed
                </div>
            </div>
        </div>
    );
};
