import { HttpClientInterface } from 'httpClient/httpClient';
import { TokenRepositoryInterface } from 'repositories/tokenRepository';

export interface TodoServiceInterface {
  getTodos(): Promise<ITodo[]>;
  addTodo(todo: string): Promise<ITodo>;
  deleteTodo(id: number): Promise<void>;
  updateTodo(id: number, todo: ITodo): Promise<ITodo>;
}

export class TodoService implements TodoServiceInterface {
  httpClient: HttpClientInterface;
  tokenRepository: TokenRepositoryInterface;
  constructor(httpClient: HttpClientInterface, tokenRepository: TokenRepositoryInterface) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async getTodos(): Promise<ITodo[]> {
    const response = await this.httpClient.get('todos');
    const data = await response.json();
    return data;
  }

  async addTodo(todo: string): Promise<ITodo> {
    const response = await this.httpClient.post('todos', { todo: todo });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  }
  async deleteTodo(id: number): Promise<void> {
    const response = await this.httpClient.delete(`todos/${id}`);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
  }

  async updateTodo(id: number, todo: ITodo): Promise<ITodo> {
    const response = await this.httpClient.put(`todos/${id}`, {
      todo: todo.todo,
      isCompleted: todo.isCompleted,
    });
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data;
  }
}

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
