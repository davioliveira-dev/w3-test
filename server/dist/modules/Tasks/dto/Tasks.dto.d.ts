export type TasksDto = {
    id: number;
    title: string;
    isDone: boolean;
    createdAt: Date;
    updatedAt: Date;
};
export type CreateTaskDto = {
    title: string;
    isDone?: boolean;
};
export type UpdateTaskDto = {
    id: number;
    title?: string;
    isDone?: boolean;
};
export type DeleteTaskDto = {
    id: number;
};
