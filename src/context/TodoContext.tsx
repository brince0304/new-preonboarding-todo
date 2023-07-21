import { createContext, ReactNode, useContext, useState } from 'react';
import { ITodo, TodoServiceInterface } from 'services/todoService';

const todoContext = createContext<ITodoReturn>({} as ITodoReturn);
export const useTodo = () => useContext(todoContext);

export const TodoProvider = ({ children, todoService }: { children: ReactNode; todoService: TodoServiceInterface }) => {
  const [todoState, setTodoState] = useState<ITodo[]>([]);
  const getTodos = todoService.getTodos.bind(todoService);
  const addTodo = todoService.addTodo.bind(todoService);
  const updateTodo = todoService.updateTodo.bind(todoService);
  const deleteTodo = todoService.deleteTodo.bind(todoService);
  const getTodosCallback = async () => {
    const res = await getTodos();
    setTodoState(res);
  };
  const addTodoCallback = async (todo: string) => {
    const res = await addTodo(todo);
    setTodoState([...todoState, res]);
  };
  const updateTodoCallback = async (id: number, todo: ITodo) => {
    const res = await updateTodo(id, todo);
    const newTodoState = todoState.map((todo) => {
      if (todo.id === id) {
        return res;
      }
      return todo;
    });
    setTodoState(newTodoState);
  };
  const deleteTodoCallback = async (id: number) => {
    await deleteTodo(id);
    const newTodoState = todoState.filter((todo) => todo.id !== id);
    setTodoState(newTodoState);
  };

  return (
    <todoContext.Provider
      value={{
        todoState,
        getTodos: getTodosCallback,
        addTodo: addTodoCallback,
        updateTodo: updateTodoCallback,
        deleteTodo: deleteTodoCallback,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

interface ITodoReturn {
  todoState: ITodo[];
  getTodos: () => Promise<void>;
  addTodo: (todo: string) => Promise<void>;
  updateTodo: (id: number, todo: ITodo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}
