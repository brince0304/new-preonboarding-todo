import Input, { IInputProps } from 'components/common/Input';
import { useAuth } from 'context/AuthContext';
import { useTodo } from 'context/TodoContext';
import useInput from 'hooks/useInput';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLink } from 'router/Router';
import { ITodo } from 'services/todoService';
import * as S from './TodoItem.style';

const TodoItem = ({ todo }: ITodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const {
    value: todoInput,
    onChange: todoOnChange,
    isValidate: isValidTodo,
  } = useInput<string>({
    initialValue: todo.todo,
    regex: /.{1,}/,
    refObject: todoInputRef,
  });
  const navigate = useNavigate();

  const { id, isCompleted, todo: todoContent, userId } = todo;
  const deleteToastProps = {
    severity: 'success',
    autoHideDuration: 3000,
    children: '할일이 삭제되었습니다.',
  } as IUseToastProps;

  const errorToastProps = {
    severity: 'error',
    autoHideDuration: 3000,
    children: '인증이 만료되었습니다. 로그아웃됩니다.',
  } as IUseToastProps;

  const updateToastProps = {
    severity: 'success',
    autoHideDuration: 3000,
    children: '할일이 수정되었습니다.',
  } as IUseToastProps;

  const { toast: updateSuccessToast, handleOpenToast: handleOpenUpdateSuccessToast } = useToast(updateToastProps);
  const { toast: deleteSuccessToast, handleOpenToast: handleOpenDeleteSuccessToast } = useToast(deleteToastProps);
  const { toast: errorToast, handleOpenToast: handleOpenErrorToast } = useToast(errorToastProps);
  const { isAuthenticated } = useAuth();
  const { updateTodo, deleteTodo } = useTodo();

  const handleError = () => {
    handleOpenErrorToast();
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate(routeLink.signOut);
      }, 2000);
    }
  };

  const handleSuccessUpdateTodo = () => {
    handleOpenUpdateSuccessToast();
  };

  const handleSuccessDelete = () => {
    handleOpenDeleteSuccessToast();
  };

  const handleToggleIsCompleted = async () => {
    try {
      await updateTodo(id, { id: id, todo: todoContent, isCompleted: !isCompleted, userId: userId });
      handleSuccessUpdateTodo();
    } catch (e) {
      handleError();
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      handleSuccessDelete();
    } catch (e) {
      handleError();
    }
  };

  const handleToggleIsOnEdit = () => {
    setIsOnEdit(!isOnEdit);
  };

  const inputProps = {
    defaultValue: todoContent,
    onChange: todoOnChange,
    autoFocus: true,
    testId: 'todo-input',
    type: 'text',
  } as IInputProps;

  const handleUpdateTodo = async () => {
    if (todoInput === todoContent) {
      setIsOnEdit(false);
      return;
    }
    try {
      await updateTodo(id, { id: id, todo: todoInput, isCompleted: isCompleted, userId: userId });
      handleSuccessUpdateTodo();
    } catch (e) {
      handleError();
    }
    setIsOnEdit(false);
  };

  return (
    <S.Container>
      {!isOnEdit && <S.Checkbox type="checkbox" checked={isCompleted} onChange={handleToggleIsCompleted} />}
      {!isOnEdit && <S.Text>{todoContent}</S.Text>}
      {isOnEdit && <Input {...inputProps} ref={todoInputRef} style={{ padding: '0px 10px' }} />}
      {!isOnEdit && (
        <S.Section>
          <S.Button onClick={handleToggleIsOnEdit}>수정</S.Button>
          <S.Button onClick={handleDelete}>삭제</S.Button>
        </S.Section>
      )}
      {isOnEdit && (
        <S.Section>
          <S.Button onClick={handleUpdateTodo} disabled={!isValidTodo}>
            제출
          </S.Button>
          <S.Button onClick={handleToggleIsOnEdit}>취소</S.Button>
        </S.Section>
      )}
      {deleteSuccessToast}
      {updateSuccessToast}
      {errorToast}
    </S.Container>
  );
};

interface ITodoItemProps {
  todo: ITodo;
}

export default TodoItem;
