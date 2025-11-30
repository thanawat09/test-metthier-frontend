import { TaskStatus } from "@/enums/task.enum";

export const taskStatus = [
    {
        name: "Todo",
        value: TaskStatus.TODO
    },
    {
        name: "In Progress",
        value: TaskStatus.IN_PROGRESS
    }, {
        name: "Done",
        value: TaskStatus.DONE
    }
]