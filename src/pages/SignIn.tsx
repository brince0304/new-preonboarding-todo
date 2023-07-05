import { signIn } from 'apis/auth';
import AuthForm from 'components/auth/AuthForm';
import * as S from './SignIn.style';
const SignIn = () => {
  const handleSignInError = () => {
    alert('로그인에 실패했습니다.');
  };
  return (
    <S.Container>
      <AuthForm title={'로그인'} api={signIn} errorHandler={handleSignInError} />
    </S.Container>
  );
};

export default SignIn;
