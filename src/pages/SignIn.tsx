import AuthForm from 'components/auth/AuthForm';
import { useAuth } from 'context/AuthContext';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAuth } from 'services/authService';
import * as S from './SignIn.style';

const SignIn = () => {
  const successToastProps = {
    severity: 'success',
    autoHideDuration: 2000,
    sx: { width: '100%' },
    children: '로그인에 성공했습니다. 2초 후에 메인 페이지로 이동합니다.',
  } as IUseToastProps;
  const errorToastProps = {
    severity: 'error',
    autoHideDuration: 2000,
    sx: { width: '100%' },
    children: '이메일이나 비밀번호가 옳지 않습니다.',
  } as IUseToastProps;
  const { toast: SignInToast, handleOpenToast: handleOpenSuccessToast } = useToast(successToastProps);
  const { toast: ErrorToast, handleOpenToast: handleOpenErrorToast } = useToast(errorToastProps);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const signInCallback = async (data: IAuth) => {
    setIsLoading(true);
    setIsError(false);
    try {
      await signin(data);
      handleOpenSuccessToast();
      navigate('/todo');
    } catch (e) {
      setIsError(true);
      handleOpenErrorToast();
    }
    setIsLoading(false);
  };

  return (
    <S.Container>
      <AuthForm
        title={'로그인'}
        apiCallback={signInCallback}
        testId="signin-button"
        isError={isError}
        isLoading={isLoading}
      />
      {SignInToast}
      {ErrorToast}
    </S.Container>
  );
};

export default SignIn;
