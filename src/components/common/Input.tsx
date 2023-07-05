import { ForwardedRef, forwardRef, HTMLProps, ReactNode } from 'react';
import * as S from './Input.style';

const Input = forwardRef((props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { error, helperText, icon, ...rest } = props;
  return (
    <S.Container>
      <S.Input ref={ref} {...rest} />
      <S.IconWrap>{icon}</S.IconWrap>
      <S.HelperText error={error}>{helperText}</S.HelperText>
    </S.Container>
  );
});

interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'ref'> {
  error?: boolean;
  helperText?: string;
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: ReactNode;
}

export default Input;
