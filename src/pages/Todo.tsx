import { getTodos } from 'apis/todo';
import TodoForm from 'components/todo/TodoForm';
import TodoList from 'components/todo/TodoList';
import useAxios from 'hooks/useAxios';
import { useEffect } from 'react';

const Todo = () => {
  const { data, request } = useAxios({
    api: getTodos,
  });

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TodoForm getTodos={request} />
      <TodoList todos={data} getTodos={request} />
    </div>
  );
};

export default Todo;
