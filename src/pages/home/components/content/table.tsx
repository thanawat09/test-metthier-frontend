import type { Meta } from '@/api/http-response.interface';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Task } from '@/interfaces/task.interface';
import { cn } from '@/lib/utils';
import BadgeTaskStatus from '@/pages/home/components/badge-task-status';
import dayjs from 'dayjs';
import { FaEdit } from 'react-icons/fa';

type Props = {
    tasks: Task[]
    meta: Meta
    isLoading: boolean
    updateTask: (id: string) => void
}
export default function HomeTableContent({ tasks, meta, isLoading, updateTask }: Props) {

    return (
        <Table className='w-full'>
            <TableHeader className="bg-gray-200">
                <TableRow>
                    <TableHead className="w-[50px] hidden md:table-cell text-center">No.</TableHead>
                    <TableHead className="w-[300px] ">Title</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="w-[100px] hidden md:table-cell">Date</TableHead>
                    <TableHead className="w-[150px] text-center" >Manage</TableHead>
                </TableRow>
            </TableHeader>

            {
                tasks.length === 0 || isLoading ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No tasks found.
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {tasks.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell className="hidden md:table-cell text-center">{index + 1 + ((meta.page - 1) * meta.limit)}</TableCell>
                                <TableCell className="font-medium max-w-[200px]">
                                    <div className='flex items-center gap-2'>
                                        <p className="line-clamp-1" title={task.title}>{task.title}</p>
                                        <BadgeTaskStatus className={cn('md:hidden')} status={task.status} />
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-[200px]">
                                    <div className='flex items-center gap-2'>
                                        <BadgeTaskStatus status={task.status} />
                                        <p className="line-clamp-1" title={task.description}>{task.description}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right hidden md:table-cell">{dayjs(task.created_at).format('DD/MM/YYYY HH:mm')} </TableCell>
                                <TableCell className="flex items-center justify-end gap-2">
                                    <FaEdit className='text-gray-600 cursor-pointer' onClick={() => updateTask(task.id)} size={20} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
        </Table>
    )
}