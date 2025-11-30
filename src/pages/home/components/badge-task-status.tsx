import { Badge } from '@/components/ui/badge'
import { TaskStatus } from '@/enums/task.enum'
import { cn } from '@/lib/utils'
import { ListCheck } from 'lucide-react'

type Props = {
    status: TaskStatus,
    className?: string
}

export default function BadgeTaskStatus({ status, className }: Props) {

    return (
        <Badge
            variant="secondary"
            className={cn("bg-red-400 text-white ", {
                "bg-gray-400 text-white": status === TaskStatus.TODO,
                "bg-blue-400 text-white": status === TaskStatus.IN_PROGRESS,
                "bg-green-400 text-white": status === TaskStatus.DONE,
            }, className)}
        >
            <ListCheck />
            {status}
        </Badge>
    )
}