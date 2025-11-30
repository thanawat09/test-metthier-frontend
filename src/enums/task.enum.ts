export const TaskStatus = {
    TODO: 'ToDo',
    IN_PROGRESS: 'InProgress',
    DONE: 'Done',
    DELETED: 'Deleted',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];