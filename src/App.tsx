import Header from 'components/common/Header';
import { Outlet } from 'react-router';
import './App.css';
import * as S from './App.style';
function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header />
      <S.Container>
        <Outlet />
      </S.Container>
    </div>
  );
}

export default App;
