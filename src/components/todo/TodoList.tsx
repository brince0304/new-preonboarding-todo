import Loading from 'components/common/Loading';
import { ITodo } from 'services/todoService';
import TodoItem from './TodoItem';
import * as S from './TodoList.style';

const TodoList = ({ todos, isLoading, isError }: ITodoListProps) => {
  return (
    <S.Container>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {isError && <div>에러가 발생했습니다.</div>}
      {isLoading && <Loading />}
    </S.Container>
  );
};

interface ITodoListProps {
  todos: ITodo[];
  isError?: boolean;
  isLoading?: boolean;
}

export default TodoList;
