import { ChangeEvent, MutableRefObject, useState } from "react";

interface UseInputProps <T> {
    initialValue: T;
    regex?: RegExp;
    refObject? : MutableRefObject<HTMLInputElement>;
}

const useInput = <T,>({initialValue, regex, refObject}: UseInputProps<T>) => {
    const [value, setValue] = useState<T>(initialValue);
    const isValidate = regex && typeof value === "string" ? regex.test(value) : true;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value as unknown as T);
    }
    const setFocus = () => {
        if (refObject && refObject.current) {
            refObject.current.focus();
        }
    }
    const setBlur = () => {
        if (refObject && refObject.current) {
            refObject.current.blur();
        }
    }

    return {
        value,
        setValue,
        onChange,
        isValidate,
        setFocus,
        setBlur,
    }
    
}

export default useInput;
