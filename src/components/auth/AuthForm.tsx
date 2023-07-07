import Button from 'components/common/Button';
import useHover from 'hooks/useHover';
import useInput from 'hooks/useInput';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Input, { IInputProps } from '../common/Input';
import * as S from './AuthForm.style';
import { ErrorIcon, HappyCatIcon, HideIcon, Icon, LoadingIcon, SuccessIcon } from '../common/Icon';

const AuthForm = ({ testId, request, title, error, loading, isSuccess }: IAuthProps) => {
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
    testId: 'email-input',
  } as IInputProps;

  const passwordInputProps = {
    label: '비밀번호',
    type: isPasswordHide ? 'password' : 'text',
    name: 'password',
    value: passwordValue,
    onChange: onPasswordChange,
    error: !isPasswordValid && passwordValue.length > 0,
    testId: 'password-input',
    helperText:
      !isPasswordValid && passwordValue.length > 0 ? '비밀번호는 8자 이상이어야 합니다.' : '비밀번호를 입력해주세요.',
  } as IInputProps;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const isButtonHover = useHover({ ref: buttonRef });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      await request({ email: emailValue, password: passwordValue });
    }
  };

  useEffect(() => {
    if (error) {
      setEmailFocus();
    }
  }, [error, setEmailFocus]);

  const buttonIcon = loading ? (
    <LoadingIcon width="30px" height="30px" />
  ) : isButtonHover ? (
    <LoadingIcon width="30px" height="30px" />
  ) : (
    <Icon width="30px" height="30px" />
  );
  const emailInputIcon = error ? (
    <ErrorIcon width={'30px'} height={'30px'} />
  ) : (
    <SuccessIcon width="30px" height="30px" />
  );
  const passwordInputIcon = <HideIcon isHide={isPasswordHide} setIsHide={setIsPasswordHide} />;

  return (
    <S.Container>
      <S.Title>
        <HappyCatIcon width="40px" height="40px" />
        <span>{title}</span>
        <HappyCatIcon width="40px" height="40px" />
      </S.Title>
      <S.Form onSubmit={onSubmit}>
        <Input {...emailInputProps} ref={emailInputRef} icon={emailInputIcon} />
        <Input {...passwordInputProps} icon={passwordInputIcon} ref={passwordInputRef} />
        <Button
          testId={testId}
          type="submit"
          ref={buttonRef}
          disabled={disabled || isSuccess}
          icon={buttonIcon}
          label={loading ? '로딩중...' : title}
        />
      </S.Form>
    </S.Container>
  );
};

interface IAuthProps {
  request: (data?: any) => Promise<void>;
  error?: any;
  loading?: boolean;
  isSuccess?: boolean;
  title: string;
  testId: string;
}

export default AuthForm;
