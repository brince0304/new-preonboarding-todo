import { setToken, useAuthDispatch } from 'context';
import { useEffect } from 'react';

const SignOut = () => {
  const authDispatch = useAuthDispatch();
  useEffect(() => {
    setToken(authDispatch, null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default SignOut;
