import { TaskCard } from "@/components/task-card";
import { Topbar } from "@/components/topbar";

export default function Home() {
    return (
        <div className="h-screen flex flex-col">
            <Topbar />

            <div className="bg-[rgb(0,20,48)]">
                <div className="flex flex-col items-center justify-center h-full">
                    <TaskCard
                        task={{
                            dueDate: new Date(),
                            description: "Test",
                            id: "1",
                            priority: "low",
                            status: "todo",
                            title: "Test",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
