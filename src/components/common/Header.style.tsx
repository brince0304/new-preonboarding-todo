import { styled } from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  padding: 0 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #121212;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  z-index: 100;
  position: fixed;
  top: 0;
`;

export const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #121212;
  cursor: pointer;
`;

export const Menus = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const MenuText = styled.li`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 100%;
  cursor: pointer;
  color: #121212;
  &:hover {
    color: #ff6b6b;
  }
  &:active {
    color: #ff6b6b;
  }
`;
