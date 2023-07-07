import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: 1px solid #121212;
  border-radius: 0px;
`;

export const Text = styled.span`
  font-size: 1.2rem;
  color: #121212;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Section = styled.section`
  float: right;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #white;
  border: none;
  width: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #121212;
  cursor: pointer;
  box-shadow: 0px 1px 1px 1px #ffbfge;
  &:hover {
    color: #ff6b6b;
  }
  &:active {
    color: #ff6b6b;
  }
  &:disabled {
    color: #646464;
    cursor: not-allowed;
  }
`;
