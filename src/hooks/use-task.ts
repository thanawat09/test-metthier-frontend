import type { DataList } from "@/api/http-response.interface";
import { taskApi } from "@/api/service/task-api.service";
import type { Task } from "@/interfaces/task.interface";
import type { CreateTaskRequest, UpdateTaskRequest } from "@/schemas/task.schema";
import { getQueryParams, type Filter } from "@/utils/query-params";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export interface FilterTask extends Filter {
    filters?: {
        search?: string;
        status?: string;
    };
}

export const taskQueryKey = {
    all: ['task'],
    list: (filter: FilterTask) =>
        [...taskQueryKey.all, 'list', { ...filter }] as const,
    detail: (id: string) => [...taskQueryKey.all, 'detail', id] as const,
};

export function useGetTaskById(id?: string) {
    return useQuery({
        queryKey: taskQueryKey.detail(id || ''),
        queryFn: () => taskApi.getTaskById(id || ''),
        select: (response) => response.data,
        enabled: !!id,
    });
}
export function useGetTasks(filter: FilterTask) {
    const queryParams = getQueryParams(filter);
    return useQuery({
        queryKey: taskQueryKey.list(filter),
        queryFn: () => taskApi.getTasks(queryParams),
        placeholderData: keepPreviousData,
        select: (response) => response.data as DataList<Task>,
        staleTime: 0,
        gcTime: 0,
    });
}

export function useCreateTask() {
    return useMutation({
        mutationFn: async (reqData: CreateTaskRequest) => {
            return await taskApi.createTask(reqData);
        },
    });
}

export function useUpdateTask() {
    return useMutation({
        mutationFn: async (reqData: { id: string, reqData: UpdateTaskRequest }) => {
            return await taskApi.updateTask(reqData.id, reqData.reqData);
        },
    });
}
export function useDeleteTask() {
    return useMutation({
        mutationFn: async (id: string) => {
            return await taskApi.deleteTask(id);
        },
    });
}

