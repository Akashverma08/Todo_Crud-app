import type { Task, CreateTask, UpdateTaskType } from "../types/task";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getTasks = async (
    filterType?: string,
    search?: string
): Promise<Task[]> => {
    const response = await axios.get(`${url}/tasks`, {
        params: filterType && search
            ? {
                [filterType]: search
            }
            : {}
    });

    return response.data;
};

export const addNewTask = async (
    task: CreateTask
): Promise<Task> => {
    const response = await axios.post(`${url}/tasks`, task);

    return response.data;
};

export const updatedTaskApi = async (
    id: string,
    task: UpdateTaskType
): Promise<Task> => {
    const response = await axios.patch(
        `${url}/tasks/${id}`,
        task
    );

    return response.data;
};

export const deleteTaskApi = async (
    id: string
) => {
    const response = await axios.delete(
        `${url}/tasks/${id}`
    );

    return response.data;
};

export const getTaskById = async (
    id: string
): Promise<Task> => {
    const response = await axios.get(
        `${url}/tasks/${id}`
    );

    return response.data;
};