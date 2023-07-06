import { signIn } from 'apis/auth';
import AuthForm from 'components/auth/AuthForm';
import useToast, { IUseToastProps } from 'hooks/useToast';
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
  return (
    <S.Container>
      <AuthForm title={'로그인'} api={signIn} errorHandler={handleSignInError} successHandler={handleSignInSuccess} />
      {SignInToast}
      {ErrorToast}
    </S.Container>
  );
};

export default SignIn;
