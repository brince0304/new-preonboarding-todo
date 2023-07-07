import { Tooltip } from '@mui/material';
import { createTodo } from 'apis/todo';
import { Icon, LoadingIcon } from 'components/common/Icon';
import Button from 'components/common/Button';
import Input, { IInputProps } from 'components/common/Input';
import { getTokenFromLocalStorage } from 'context';
import useAxios from 'hooks/useAxios';
import useHover from 'hooks/useHover';
import useInput from 'hooks/useInput';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLink } from 'router/Router';
import * as S from './TodoForm.style';

const TodoForm = ({ getTodos }: ITodoFormProps) => {
  const navigate = useNavigate();
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoButtonRef = useRef<HTMLButtonElement>(null);
  const { value, setValue, onChange, isValidate } = useInput<string>({
    initialValue: '',
    regex: /.{1,}/,
    refObject: todoInputRef,
  });
  const successToastProps = {
    severity: 'success',
    autoHideDuration: 3000,
    sx: { width: '100%' },
    children: '할일이 추가되었습니다.',
  } as IUseToastProps;

  const errorToastProps = {
    severity: 'error',
    autoHideDuration: 3000,
    sx: { width: '100%' },
    children: '인증이 만료되었습니다. 로그아웃됩니다.',
  } as IUseToastProps;
  const { toast: successToast, handleOpenToast: handleOpenSuccessToast } = useToast(successToastProps);
  const { toast: errorToast, handleOpenToast: handleOpenErrorToast } = useToast(errorToastProps);

  const successHandler = () => {
    setValue('');
    getTodos();
    handleOpenSuccessToast();
    setIsButtonHover(false);
  };

  const errorHandler = () => {
    const token = getTokenFromLocalStorage();
    handleOpenErrorToast();
    setIsButtonHover(false);
    if (!token) {
      setTimeout(() => {
        navigate(routeLink.signOut);
      }, 3000);
    }
  };

  const { loading, request } = useAxios({
    api: createTodo,
    successCallback: successHandler,
    errorCallback: errorHandler,
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidate) {
      await request({ todo: value });
    }
  };

  const todoInputProps = {
    label: '할 일',
    type: 'text',
    name: 'todo',
    value,
    onChange,
    testId: 'new-todo-input',
  } as IInputProps;
  const { isHover: isButtonHover, setIsHover: setIsButtonHover } = useHover({ ref: todoButtonRef });
  const submitButtonDisabled = !isValidate || loading;
  const submitButtonLabel = loading ? (
    <LoadingIcon width="30px" height="30px" />
  ) : isButtonHover ? (
    <LoadingIcon width="30px" height="30px" />
  ) : (
    <Icon width="30px" height="30px" />
  );

  return (
    <S.Form onSubmit={onSubmit}>
      <Input {...todoInputProps} ref={todoInputRef} />
      <Tooltip title="추가" placement="top" arrow>
        <Button
          ref={todoButtonRef}
          width={'100px'}
          type="submit"
          disabled={submitButtonDisabled}
          label={submitButtonLabel}
          style={{ marginBottom: '10px' }}
          testId="new-todo-add-button"
        />
      </Tooltip>
      {successToast}
      {errorToast}
    </S.Form>
  );
};

interface ITodoFormProps {
  getTodos: (data?: any) => Promise<void>;
}

export default TodoForm;
