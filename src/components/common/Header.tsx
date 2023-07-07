import { HappyCatIcon } from 'components/common/Icon';
import { useAuthState } from 'context';
import { useNavigate } from 'react-router-dom';
import * as S from './Header.style';
import {  MouseEvent } from 'react';
import useToast, { IUseToastProps } from 'hooks/useToast';

const Header = () => {
  const toastProps = {
    severity: 'success',
    autoHideDuration: 2000,
    sx: { width: '100%' },
    children: '로그아웃에 성공했습니다. 2초 후에 메인 페이지로 이동합니다.',
  } as IUseToastProps
  const { toast: SignOutToast, handleOpenToast: handleOpenSignOutToast } = useToast(toastProps);
  const authState = useAuthState();
  const navigate = useNavigate();
  const handleNavigate = (name: string) => {
    if (name === '로그아웃') {
      handleOpenSignOutToast();
      setTimeout(() => {
        navigate('/signout');
      }, 2000);
    } else if (name === '투두') {
      navigate('/todo');
    } else if (name === '로그인') {
      navigate('/signin');
    } else if (name === '회원가입') {
    
      navigate('/signup');
    }
  };

    const handleClickMenu = (e: MouseEvent<HTMLLIElement>) => {
        const name = e.currentTarget.innerHTML;
      handleNavigate(name);
    };

  return (
    <S.Header>
      <S.Logo>
        <HappyCatIcon width='70px' height='70px' />
      </S.Logo>
      <S.Menus>
        <S.Menu>
          {authState.token && (
            <>
              <S.MenuText onClick={handleClickMenu}>투두</S.MenuText>
              <S.MenuText onClick={handleClickMenu}>로그아웃</S.MenuText>
            </>
          )}
          {!authState.token && (
            <>
              <S.MenuText onClick={handleClickMenu}>로그인</S.MenuText>
              <S.MenuText onClick={handleClickMenu}>회원가입</S.MenuText>
            </>
          )}
        </S.Menu>
      </S.Menus>
      {SignOutToast}
    </S.Header>
  );
};

export default Header;
