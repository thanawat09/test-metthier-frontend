import { useFiltersMeta } from "@/hooks/use-filters-meta";
import { useGetTasks } from "@/hooks/use-task";
import { useTaskStore } from "@/stores/task.store";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

export const useFilterTask = () => {
    const [search] = useQueryState('search');
    const [status] = useQueryState('status');
    const { limit, page } = useFiltersMeta();

    const { setTasks, setMeta } = useTaskStore();

    const { data, isLoading } = useGetTasks({
        limit,
        page,
        filters: {
            search: search || undefined,
            status: status || undefined,
        },
    });

    useEffect(() => {
        if (data) {
            setTasks(data.items);
            setMeta(data.meta);
        }
    }, [data]);

    return {
        isLoading,
        search,
        status,
        limit,
        page,
    };
}