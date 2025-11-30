import { cn } from '@/lib/utils'
import PaginationTable from '@/pages/home/components/content/pagination-table'
import HomeTableContent from '@/pages/home/components/content/table'
import HomeTableTitle from '@/pages/home/components/content/title'
import { TaskFormModal } from '@/pages/home/components/task-form-modal'
import { useFilterTask } from '@/pages/home/hooks/use-filter-task'
import { useTaskStore } from '@/stores/task.store'
import { useModal } from '@ebay/nice-modal-react'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'


export default function HomeContent() {
    const { tasks, meta } = useTaskStore();
    const { isLoading, } = useFilterTask();
    const { width = 0 } = useWindowSize()
    const taskFormModal = useModal(TaskFormModal)

    const [paginationItemsToDisplay, setPaginationItemsToDisplay] = useState(5);

    const manageTask = (id?: string) => {
        taskFormModal.show({ id });
    };

    useEffect(() => {
        if (width < 640) {
            setPaginationItemsToDisplay(2);
        } else if (width < 768) {
            setPaginationItemsToDisplay(3);
        } else if (width < 1024) {
            setPaginationItemsToDisplay(5);
        } else {
            setPaginationItemsToDisplay(10);
        }
    }, [width]);

    return (
        <div className="bg-white shadow-xl p-4 rounded-md">
            <HomeTableTitle addTask={() => manageTask(undefined)} />
            <div className="mt-4 md:mt-6">
                <HomeTableContent isLoading={isLoading} tasks={tasks} meta={meta} updateTask={manageTask} />
                <PaginationTable
                    className={cn("mt-4", { "hidden": tasks.length === 0 })}
                    currentPage={meta.page}
                    totalPages={meta.totalPages}
                    paginationItemsToDisplay={paginationItemsToDisplay}
                />
            </div>
        </div>
    )
}