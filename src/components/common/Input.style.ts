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
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: ${({ fontSize }) => fontSize || '16px'};
    font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
    color: ${({ color }) => color || '#121212'};
    box-sizing: border-box;
    outline: none;
    &:focus {
        border: 1px solid #000;
    }
`;

export const IconWrap = styled.div`
position: absolute;
right: 10px;
top: 50%;
`;

export const HelperText = styled.span<StyledHelpertextProps>`
color: ${({ error }) => error ? 'red' : '#000'};
font-size: 12px;
font-weight: ${({ error }) => error ? '500' : 'normal'};
`;

interface StyledInputProps {
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
}

interface StyledHelpertextProps {
    error?: boolean;
}
