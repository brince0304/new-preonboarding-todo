import Button from 'components/common/Button';
import useAxios from 'hooks/useAxios';
import useInput from 'hooks/useInput';
import React from 'react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Input, { IInputProps } from '../common/Input';
import * as S from './AuthForm.style';
import { ErrorIcon, HideIcon, SuccessIcon } from './AuthIcons';

const AuthForm = ({ api, title, errorHandler }: IAuthProps) => {
  const emailRegex = /@/;
  const emailInputRef = useRef<HTMLInputElement>(null);
  const {
    value: emailValue,
    onChange: onEmailChange,
    isValidate: isEmailValid,
    setFocus: setEmailFocus,
  } = useInput<string>({ initialValue: '', regex: emailRegex, refObject: emailInputRef });
  const passwordRegex = /.{8,}/;
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const {
    value: passwordValue,
    onChange: onPasswordChange,
    isValidate: isPasswordValid,
  } = useInput<string>({ initialValue: '', regex: passwordRegex, refObject: passwordInputRef });
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const { loading, error, request, data } = useAxios(api);
  const disabled = !isEmailValid || !isPasswordValid || loading;

  const emailInputProps = {
    label: '이메일',
    type: 'email',
    name: 'email',
    value: emailValue,
    onChange: onEmailChange,
    error: !isEmailValid && emailValue.length > 0,
    helperText: !isEmailValid && emailValue.length > 0 ? '이메일 형식이 올바르지 않습니다.' : '"@"를 포함해주세요.',
    autoFocus: true,
  } as IInputProps;

  const passwordInputProps = {
    label: '비밀번호',
    type: isPasswordHide ? 'password' : 'text',
    name: 'password',
    value: passwordValue,
    onChange: onPasswordChange,
    error: !isPasswordValid && passwordValue.length > 0,
    helperText:
      !isPasswordValid && passwordValue.length > 0 ? '비밀번호는 8자 이상이어야 합니다.' : '비밀번호를 입력해주세요.',
  } as IInputProps;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      await request({ email: emailValue, password: passwordValue });
    }
  };

  useEffect(() => {
    if (error) {
      errorHandler();
      setEmailFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data?.access_token) {
      localStorage.setItem('token', data.access_token);
    }
  }, [data]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Form onSubmit={onSubmit}>
        <Input {...emailInputProps} ref={emailInputRef} icon={error ? <ErrorIcon /> : <SuccessIcon />} />
        <Input
          {...passwordInputProps}
          icon={<HideIcon isHide={isPasswordHide} setIsHide={setIsPasswordHide} />}
          ref={passwordInputRef}
        />
        <Button type="submit" disabled={disabled} label={loading ? '로딩중...' : title} />
      </S.Form>
    </S.Container>
  );
};

interface IAuthProps {
  api: (data?: any) => Promise<void>;
  title: string;
  errorHandler: () => void;
}

export default AuthForm;
