'use client';

import NiceModal, { useModal } from '@ebay/nice-modal-react';

import ConfirmModal from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { taskStatus } from '@/constants/task-status';
import { TaskStatus } from '@/enums/task.enum';
import { taskQueryKey, useCreateTask, useDeleteTask, useGetTaskById, useUpdateTask } from '@/hooks/use-task';
import { cn } from '@/lib/utils';
import { useFilterTask } from '@/pages/home/hooks/use-filter-task';
import { createTaskSchema, type CreateTaskRequest, type UpdateTaskRequest } from '@/schemas/task.schema';
import { getMassageAxiosError } from '@/utils/manage-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const TaskFormModal = NiceModal.create<{ id?: string }>(({ id }) => {
    const modal = useModal();
    const confirmModal = useModal(ConfirmModal);
    const { search, status, limit, page } = useFilterTask();
    const queryClient = useQueryClient();

    const { data: task } = useGetTaskById(id);
    const { mutate: createTask } = useCreateTask();
    const { mutate: updateTask } = useUpdateTask();
    const { mutate: deleteTask } = useDeleteTask();

    const form = useForm<CreateTaskRequest>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
            status: TaskStatus.TODO,
        },
    });

    const reloadTask = async () => {
        await queryClient.invalidateQueries({
            queryKey: taskQueryKey.list({ limit, page, filters: { search: search || undefined, status: status || undefined } }),
        });
    };
    const handleDelete = async () => {
        if (!id) return;

        confirmModal.show({
            title: 'Delete task',
            description: 'Are you sure you want to delete this task?',
        }).then((ok) => {
            if (ok) {
                deleteTask(id, {
                    onSuccess: () => {
                        toast.success('Delete task successfully');
                        reloadTask();
                        modal.remove();
                    },
                    onError: (error: unknown) => {
                        toast.error(getMassageAxiosError(error));
                    },
                })
            }
        })

    };
    const handleUpdate = async (reqData: UpdateTaskRequest) => {
        if (!id) return;
        updateTask({ id, reqData }, {
            onSuccess: () => {
                toast.success('Update task successfully');
                reloadTask();
                modal.remove();
            },
            onError: (error: unknown) => {
                toast.error(getMassageAxiosError(error));
            },
        })

    };
    const handleCreate = async (reqData: CreateTaskRequest) => {
        createTask(reqData, {
            onSuccess: () => {
                toast.success('Create task successfully');
                reloadTask();
                modal.remove();
            },
            onError: (error: unknown) => {
                toast.error(getMassageAxiosError(error));
            },
        })
    };

    const onSubmit = async (data: CreateTaskRequest) => {
        if (id) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    useEffect(() => {
        if (task) {
            form.reset({
                title: task?.title || '',
                description: task?.description || '',
                status: task?.status as CreateTaskRequest['status'],
            });
        }
    }, [task]);

    return (
        <Dialog
            open={modal.visible}
            onOpenChange={(open) => {
                if (!open) modal.hide();
            }}
        >
            <DialogContent className="w-full md:w-96 p-2 md:p-4">
                <DialogHeader>
                    <DialogTitle className="text-center">{id ? 'Update Task' : 'Create Task'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!!id} className={cn(!!id && 'bg-gray-100')} placeholder="Type your title here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea readOnly={!!id} className={cn(!!id && 'bg-gray-100')} rows={5} placeholder="Type your description here." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}

                                        >
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent className='w-full'>
                                                {taskStatus.map((status) => (
                                                    <SelectItem key={status.value} value={status.value}>
                                                        {status.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center mt-5">
                            <Trash2 onClick={handleDelete} className={cn('text-gray-500', id ? 'visible' : 'invisible')} size={20} />
                            <Button type="submit" size="sm">
                                Save
                            </Button>
                        </div>
                    </form>

                </Form>
            </DialogContent>
        </Dialog>
    );
});
