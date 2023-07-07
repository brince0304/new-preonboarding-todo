import React from 'react';
import { ForwardedRef, forwardRef, HTMLProps, ReactNode } from 'react';
import * as S from './Input.style';

const Input = forwardRef((props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { error, helperText, icon, label, testId, ...rest } = props;
  return (
    <S.Container>
      {label && <label>{label}</label>}
      <S.Input ref={ref} {...rest} data-testid={testId} />
      <S.IconWrap>{icon}</S.IconWrap>
      <S.HelperText error={error}>{helperText}</S.HelperText>
    </S.Container>
  );
});

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'ref'> {
  error?: boolean;
  helperText?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  label?: string;
  icon?: ReactNode;
  testId?: string;
}

export default Input;
