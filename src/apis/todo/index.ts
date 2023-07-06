import client from "apis/client";

export const createTodo = async (content: string) : Promise<ITodo> => {
return await client.post('/todos', {content});
}

export const getTodos = async () : Promise<ITodo[]> => {
    return await client.get('/todos');
}

export const updateTodo = async (data:ITodo) : Promise<ITodo> => {
    return await client.put(`/todos/${data.id}`, data);
}

export const deleteTodo = async (id:number) : Promise<ITodo> => {
    return await client.delete(`/todos/${id}`);
}

export interface ITodo{
    id : number;
    todo : string;
    isCompleted : boolean;
    userId : number;
}
