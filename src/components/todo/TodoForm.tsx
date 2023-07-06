import { Tooltip } from '@mui/material';
import { createTodo } from 'apis/todo';
import { Icon, LoadingIcon } from 'components/auth/AuthIcons';
import Button from 'components/common/Button';
import Input, { IInputProps } from 'components/common/Input';
import useAxios from 'hooks/useAxios';
import useHover from 'hooks/useHover';
import useInput from 'hooks/useInput';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { FormEvent, useRef } from 'react';
import * as S from './TodoForm.style';

const TodoForm = ({ getTodos }: ITodoFormProps) => {
  const todoInputRef = useRef<HTMLInputElement>(null);
  const todoButtonRef = useRef<HTMLButtonElement>(null);
  const { value, setValue, onChange, isValidate } = useInput<string>({
    initialValue: '',
    regex: /.{1,}/,
    refObject: todoInputRef,
  });
  const toastProps = {
    severity: 'success',
    autoHideDuration: 3000,
    sx: { width: '100%' },
    children: '할일이 추가되었습니다.',
  } as IUseToastProps;
  const { toast: successToast, handleOpenToast } = useToast(toastProps);

  const successHandler = () => {
    setValue('');
    getTodos();
    handleOpenToast();
  };

  const errorHandler = () => {
    alert(error?.response?.data?.message);
  };

  const { error, loading, request } = useAxios({
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
  } as IInputProps;
  const isButtonHover = useHover({ ref: todoButtonRef });
  const submitButtonDisabled = !isValidate || loading;
  const submitButtonLabel = loading ? <LoadingIcon /> : isButtonHover ? <LoadingIcon /> : <Icon />;

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
          style={{ marginTop: '20px' }}
        />
      </Tooltip>
      {successToast}
    </S.Form>
  );
};

interface ITodoFormProps {
  getTodos: (data?: any) => Promise<void>;
}

export default TodoForm;
