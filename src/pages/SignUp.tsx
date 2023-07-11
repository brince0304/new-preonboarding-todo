import AuthForm from 'components/auth/AuthForm';
import { useAuth } from 'context/AuthContext';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IAuth } from 'services/authService';
import * as S from './SignIn.style';
const SignUp = () => {
  const successToastProps = {
    severity: 'success',
    autoHideDuration: 2000,
    sx: { width: '100%' },
    children: '회원가입에 성공했습니다. 2초 후에 로그인 페이지로 이동합니다.',
  } as IUseToastProps;
  const errorToastProps = {
    severity: 'error',
    autoHideDuration: 2000,
    sx: { width: '100%' },
    children: '이미 중복된 이메일이 존재합니다.',
  } as IUseToastProps;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { toast: SignUpToast, handleOpenToast: handleOpenSuccessToast } = useToast(successToastProps);
  const { toast: ErrorToast, handleOpenToast: handleOpenErrorToast } = useToast(errorToastProps);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const signupCallback = async (data: IAuth) => {
    setIsLoading(true);
    setIsError(false);
    try {
      signup(data);
      handleOpenSuccessToast();
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (e) {
      setIsError(true);
      handleOpenErrorToast();
    }
    setIsLoading(false);
  };
  return (
    <S.Container>
      <AuthForm
        title={'회원가입'}
        apiCallback={signupCallback}
        testId={'signup-button'}
        isLoading={isLoading}
        isError={isError}
      />
      {SignUpToast}
      {ErrorToast}
    </S.Container>
  );
};

export default SignUp;
