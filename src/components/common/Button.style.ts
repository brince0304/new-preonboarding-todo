import styled from 'styled-components';

export const Button = styled.button<IStyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  font-size: ${({ fontSize }) => fontSize || '1.2rem'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: #121212;
  border: 2px solid #121212;
  background-color: ${({ color }) => color || '#fff'};
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #212121;
    color: #fff;
  }
  &:disabled {
    background-color: #fff;
    color: #646464;
    cursor: not-allowed;
    &: active {
      background-color: #fff;
      color: #646464;
    }
  }
  &:active {
    background-color: #000;
    color: #404647;
  }
`;

export interface IStyledButtonProps {
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}
