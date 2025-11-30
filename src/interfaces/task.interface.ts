import type { TaskStatus } from "@/enums/task.enum";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    created_at: Date;
    updated_at: Date;
}
