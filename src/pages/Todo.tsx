import TodoForm from 'components/todo/TodoForm';
import TodoList from 'components/todo/TodoList';
import { useTodo } from 'context/TodoContext';
import { useEffect, useState } from 'react';

const Todo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { todoState, getTodos } = useTodo();
  const getTodoCallback = () => {
    setIsLoading(true);
    setIsError(false);
    getTodos()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  };
  useEffect(() => {
    getTodoCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <TodoForm />
      <TodoList isLoading={isLoading} isError={isError} todos={todoState} />
    </div>
  );
};

export default Todo;
