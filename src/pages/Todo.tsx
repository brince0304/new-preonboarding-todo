import { getTodos } from 'apis/todo';
import TodoForm from 'components/todo/TodoForm';
import useAxios from 'hooks/useAxios';
import { useEffect } from 'react';

const Todo = () => {
  const { request } = useAxios({
    api: getTodos,
  });

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TodoForm getTodos={request} />
    </div>
  );
};

export default Todo;
