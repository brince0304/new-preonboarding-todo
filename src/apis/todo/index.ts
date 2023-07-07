import client from 'apis/client';

export const createTodo = async (todo: string): Promise<ITodo> => {
  const { data } = await client.post('/todos', todo);
  return data;
};

export const getTodos = async (): Promise<ITodo[]> => {
  const { data } = await client.get('/todos');
  return data;
};

export const updateTodo = async (todo: ITodo): Promise<ITodo> => {
  const { data } = await client.put(`/todos/${todo.id}`, todo);
  return data;
};

export const deleteTodo = async (id: number): Promise<boolean> => {
  const res = await client.delete(`/todos/${id}`);
  return res.status === 204;
};

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
