import type { Task, CreateTask, UpdateTaskType } from "../types/task";

import api from "./api";


export const getTasks = async (
    filterType?: string,
    search?: string
): Promise<Task[]> => {
    const response = await api.get(`/tasks`, {
        params: filterType && search ? { [filterType]: search } : {}

    });
    return response.data;
};

export const addNewTask = async (
    task: CreateTask
): Promise<Task> => {
    
    const response = await api.post(`/tasks`, task);

    return response.data;
};

export const updatedTaskApi = async (
    id: string,
    task: UpdateTaskType
): Promise<Task> => {
    
    const response = await api.patch( `/tasks/${id}`,task,);

    return response.data;
};

export const deleteTaskApi = async (
    id: string
) => {
    
    const response = await api.delete(`/tasks/${id}`);

    return response.data;
};

export const getTaskById = async (
    id: string
): Promise<Task> => {

    const response = await api.get( `/tasks/${id}`);

    return response.data;
};