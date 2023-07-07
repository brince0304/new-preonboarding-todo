import { signIn } from 'apis/auth';
import AuthForm from 'components/auth/AuthForm';
import { setToken, useAuthDispatch } from 'context';
import useAxios from 'hooks/useAxios';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useEffect } from 'react';
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

  const handleSignInError = () => {
    handleOpenErrorToast();
  };
  const handleSignInSuccess = () => {
    handleOpenSuccessToast();
  };
  const { loading, error, request, data } = useAxios({
    api: signIn,
    successCallback: handleSignInSuccess,
    errorCallback: handleSignInError,
  });
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    if (data?.access_token) {
      setTimeout(() => {
        setToken(authDispatch, data.access_token);
      }, 2000);
    }
  }, [data, authDispatch]);

  return (
    <S.Container>
      <AuthForm
        isSuccess={!!data}
        title={'로그인'}
        error={error}
        loading={loading}
        testId="signin-button"
        request={request}
      />
      {SignInToast}
      {ErrorToast}
    </S.Container>
  );
};

export default SignIn;
