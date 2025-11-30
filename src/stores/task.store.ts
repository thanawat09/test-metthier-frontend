import type { Meta } from '@/api/http-response.interface';
import type { Task } from '@/interfaces/task.interface';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';


export type TaskState = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    meta: Meta;
    setMeta: (meta: Meta) => void;
};

export const useTaskStore = create<TaskState>()(
    devtools((set) => ({
        tasks: [],
        setTasks: (tasks: Task[]) => set({ tasks }),
        meta: {},
        setMeta: (meta: Meta) => set({ meta }),
    })),
);
