import { ITodo } from 'apis/todo';
import Loading from 'components/common/Loading';
import TodoItem from './TodoItem';
import * as S from './TodoList.style';

const TodoList = ({ todos, getTodos, error, loading }: ITodoListProps) => {
  return (
    <S.Container>
      {!!todos &&
        !loading &&
        todos.map((todo, index) => {
          return <TodoItem key={index} todo={todo} getTodos={getTodos} />;
        })}
      {error && <div>에러가 발생했습니다.</div>}
      {loading && <Loading />}
    </S.Container>
  );
};

interface ITodoListProps {
  todos: ITodo[];
  getTodos: (data?: any) => Promise<void>;
  error?: any;
  loading?: boolean;
}

export default TodoList;
