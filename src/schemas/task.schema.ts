import { TaskStatus } from '@/enums/task.enum';
import { z } from 'zod';
export const createTaskSchema = z.object({
    title: z.string().min(1, { message: 'Please enter a title' }).trim(),
    description: z.string().optional(),
    status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE]),
});
export const updateTaskSchema = createTaskSchema;

export type CreateTaskRequest = z.infer<typeof createTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof updateTaskSchema>;

