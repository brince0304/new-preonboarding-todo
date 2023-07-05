import { ChangeEvent, MutableRefObject, RefObject, useState } from 'react';

const useInput = <T,>({ initialValue, regex, refObject }: UseInputProps<T>) => {
  const [value, setValue] = useState<T>(initialValue);
  const isValidate = regex && typeof value === 'string' ? regex.test(value) : true;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  };
  const setFocus = () => {
    if (refObject && refObject.current) {
      refObject.current.focus();
    }
  };
  const setBlur = () => {
    if (refObject && refObject.current) {
      refObject.current.blur();
    }
  };

  return {
    value,
    setValue,
    onChange,
    isValidate,
    setFocus,
    setBlur,
  };
};

interface UseInputProps<T> {
  initialValue: T;
  regex?: RegExp;
  refObject?: RefObject<HTMLInputElement> | MutableRefObject<HTMLInputElement | undefined>;
}

export default useInput;
