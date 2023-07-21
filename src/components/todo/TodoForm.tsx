import { Tooltip } from '@mui/material';
import { Icon, LoadingIcon } from 'components/common/Icon';
import Button from 'components/common/Button';
import Input, { IInputProps } from 'components/common/Input';
import useHover from 'hooks/useHover';
import useInput from 'hooks/useInput';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLink } from 'router/Router';
import * as S from './TodoForm.style';
import { useTodo } from 'context/TodoContext';
import { useAuth } from 'context/AuthContext';

const TodoForm = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const { addTodo } = useTodo();
  const { isAuthenticated } = useAuth();
  const successHandler = () => {
    setValue('');
    handleOpenSuccessToast();
    setIsButtonHover(false);
  };

  const errorHandler = () => {
    handleOpenErrorToast();
    setIsButtonHover(false);
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate(routeLink.signOut);
      }, 2000);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidate) {
      setIsLoading(true);
      try {
        addTodo(value);
        successHandler();
      } catch (e) {
        errorHandler();
      }
    }
    setIsLoading(false);
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
  const submitButtonDisabled = !isValidate || isLoading;
  const submitButtonLabel = isLoading ? (
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

export default TodoForm;
