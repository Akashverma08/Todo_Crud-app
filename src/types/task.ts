export type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
};

export type CreateTask = {
    title: string;
    description: string;
    status: string;
    priority: string;
};

export type UpdateTaskType = {
    title: string;
    description: string;
    status: string;
    priority: string;
};