import { HTMLProps, ReactNode, forwardRef, ForwardedRef } from 'react';
import * as S from './Button.style';
const Button = forwardRef((props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { label, icon, testId, ...rest } = props;
  return (
    <S.Button {...rest} ref={ref} data-testid={testId}>
      {label}
      {icon}
    </S.Button>
  );
});

export interface IButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'ref'> {
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  label?: string;
  icon?: ReactNode;
  testId?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default Button;
