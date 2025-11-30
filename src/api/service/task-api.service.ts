import { apiInstance } from '@/api';
import type { DataList, HttpResponse } from '@/api/http-response.interface';
import type { Task } from '@/interfaces/task.interface';
import type { CreateTaskRequest, UpdateTaskRequest } from '@/schemas/task.schema';
import type { QueryParams } from '@/utils/query-params';


export const taskApi = {
  getTaskById: async (id: string) => {
    const response = await apiInstance.get<HttpResponse<Task>>('/task/' + id);
    return response.data;
  },
  getTasks: async (queryParams: QueryParams) => {
    const response = await apiInstance.get<HttpResponse<DataList<Task>>>('/task', {
      params: queryParams,
    });
    return response.data;
  },
  createTask: async (reqData: CreateTaskRequest) => {
    return await apiInstance.post<HttpResponse<void>>('/task', reqData);
  },
  updateTask: async (id: string, reqData: UpdateTaskRequest) => {
    return await apiInstance.patch<HttpResponse<void>>(
      `/task/${id}`,
      reqData
    );
  },
  deleteTask: async (id: string) => {
    return await apiInstance.delete<HttpResponse<void>>(`/task/${id}`);
  },
};
