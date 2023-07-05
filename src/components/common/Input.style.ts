import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  gap: 5px;
  label {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const Input = styled.input<StyledInputProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '40px'};
  padding: ${({ padding }) => padding || '5px 10px'};
  border: 2px solid #121212;
  font-size: ${({ fontSize }) => fontSize || '1.2rem'};
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  color: ${({ color }) => color || '#121212'};
  box-sizing: border-box;
  outline: none;
  &:focus {
    border: 1.5px solid #121212;
  }
`;

export const IconWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 35%;
`;

export const HelperText = styled.span<StyledHelpertextProps>`
  color: ${({ error }) => (error ? 'red' : '#000')};
  font-size: 12px;
  font-weight: ${({ error }) => (error ? '500' : 'normal')};
`;

interface StyledInputProps {
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  padding?: string;
}

interface StyledHelpertextProps {
  error?: boolean;
}
