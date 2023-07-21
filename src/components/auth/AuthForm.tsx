import Button from 'components/common/Button';
import useHover from 'hooks/useHover';
import useInput from 'hooks/useInput';
import { FormEvent, useRef, useState } from 'react';
import Input, { IInputProps } from '../common/Input';
import * as S from './AuthForm.style';
import { ErrorIcon, HappyCatIcon, HideIcon, Icon, LoadingIcon, SuccessIcon } from '../common/Icon';

const AuthForm = ({ testId, apiCallback, title, isLoading, isError }: IAuthProps) => {
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

  const disabled = !isEmailValid || !isPasswordValid || isLoading;

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
      try {
        apiCallback({ email: emailValue, password: passwordValue });
      } catch (e) {
        setEmailFocus();
      }
    }
  };

  const buttonIcon = isLoading ? (
    <LoadingIcon width="30px" height="30px" />
  ) : isButtonHover ? (
    <LoadingIcon width="30px" height="30px" />
  ) : (
    <Icon width="30px" height="30px" />
  );
  const emailInputIcon = isError ? (
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
          disabled={disabled}
          icon={buttonIcon}
          label={isLoading ? '로딩중...' : title}
        />
      </S.Form>
    </S.Container>
  );
};

interface IAuthProps {
  apiCallback: (data?: any) => void;
  isLoading?: boolean;
  isError?: boolean;
  title: string;
  testId: string;
}

export default AuthForm;
