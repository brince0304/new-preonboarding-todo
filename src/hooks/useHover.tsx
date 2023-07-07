import { RefObject, useState } from 'react';

const useHover = (props: IUseHoverProps) => {
  const [isHover, setIsHover] = useState(false);

  if (props.ref.current) {
    props.ref.current.addEventListener('mouseenter', () => setIsHover(true));
    props.ref.current.addEventListener('mouseleave', () => setIsHover(false));
  }
  return { isHover, setIsHover };
};

interface IUseHoverProps {
  ref: RefObject<HTMLButtonElement>;
}

export default useHover;
