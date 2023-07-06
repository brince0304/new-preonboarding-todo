import { HappyCatIcon } from 'components/auth/AuthIcons';
import { useAuthState } from 'context';
import * as S from './Header.style';
const Header = () => {
  const authState = useAuthState();
  return (
    <S.Header>
      <S.Logo>
        <HappyCatIcon />
      </S.Logo>
      <S.Menus>
        <S.Menu>
          {authState.token && (
            <>
              <S.MenuText>투두</S.MenuText>
              <S.MenuText>로그아웃</S.MenuText>
            </>
          )}
          {!authState.token && (
            <>
              <S.MenuText>로그인</S.MenuText>
              <S.MenuText>회원가입</S.MenuText>
            </>
          )}
        </S.Menu>
      </S.Menus>
    </S.Header>
  );
};

export default Header;
