import { ITaskCard } from "@/types/task";

export const TaskCard = ({ task }: { task: ITaskCard }) => {
    console.log(task);

    return (
        <div className="w-64 border rounded-md p-2 ">
            <h1>{task.title}</h1>
            <h1>{task.description}</h1>
            <h1>{task.dueDate.toDateString()}</h1>
            <h1>{task.priority}</h1>
            <h1>{task.status}</h1>
        </div>
    );
};
