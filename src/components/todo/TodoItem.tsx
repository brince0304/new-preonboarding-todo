import { deleteTodo, ITodo, updateTodo } from 'apis/todo';
import Input, { IInputProps } from 'components/common/Input';
import { getTokenFromLocalStorage } from 'context';
import useAxios from 'hooks/useAxios';
import useInput from 'hooks/useInput';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLink } from 'router/Router';
import * as S from './TodoItem.style';

const TodoItem = ({ todo, getTodos }: ITodoItemProps) => {
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

  const { id, isCompleted, todo: todoContent } = todo;
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

  const handleError = () => {
    const token = getTokenFromLocalStorage();
    handleOpenErrorToast();
    if (!token) {
      setTimeout(() => {
        navigate(routeLink.signOut);
      }, 3000);
    }
  };

  const handleSuccessUpdateTodo = () => {
    getTodos();
    handleOpenUpdateSuccessToast();
  };
  const handleSuccessUpdateIsCompleted = () => {
    getTodos();
  };
  const handleSuccessDelete = () => {
    getTodos();
    handleOpenDeleteSuccessToast();
  };

  const { request: requestUpdate } = useAxios({
    api: updateTodo,
    successCallback: isOnEdit ? handleSuccessUpdateTodo : handleSuccessUpdateIsCompleted,
    errorCallback: handleError,
  });
  const { request: requestDelete } = useAxios({
    api: deleteTodo,
    successCallback: handleSuccessDelete,
    errorCallback: handleError,
  });

  const handleToggleIsCompleted = async () => {
    await requestUpdate({ id, todo: todoContent, isCompleted: !isCompleted });
  };

  const handleDelete = async () => {
    await requestDelete(id);
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
    await requestUpdate({ id, todo: todoInput, isCompleted });
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
  getTodos: (data?: any) => Promise<void>;
}

export default TodoItem;
