import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid #121212;
  padding: 10px 25px 25px 25px;
  box-sizing: border-box;
`;

export const Title = styled.div`
  span {
  font-size: 1.5rem;
  font-weight: bold;
  color: #121212;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
