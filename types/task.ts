export interface ITaskCard {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: "todo" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
}
