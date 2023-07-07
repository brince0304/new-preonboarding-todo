import { signUp } from 'apis/auth';
import AuthForm from 'components/auth/AuthForm';
import useAxios from 'hooks/useAxios';
import useToast, { IUseToastProps } from 'hooks/useToast';
import { useNavigate } from 'react-router';
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

  const { toast: SignUpToast, handleOpenToast: handleOpenSuccessToast } = useToast(successToastProps);
  const { toast: ErrorToast, handleOpenToast: handleOpenErrorToast } = useToast(errorToastProps);
  const navigate = useNavigate();

  const handleSignUpError = () => {
    handleOpenErrorToast();
  };
  const handleSignUpSuccess = () => {
    handleOpenSuccessToast();
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };

  const { loading, error, request, data } = useAxios({
    api : signUp,
    successCallback: handleSignUpSuccess,
    errorCallback: handleSignUpError,
  });

  return (
    <S.Container>
      <AuthForm title={'회원가입'} request={request} testId={'signup-button'} loading={loading} error={error} isSuccess={!!data} />
      {SignUpToast}
      {ErrorToast}
    </S.Container>
  );
};

export default SignUp;
