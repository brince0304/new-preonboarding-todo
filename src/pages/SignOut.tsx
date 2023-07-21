import { useAuth } from 'context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignOut = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    signout();
    navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default SignOut;
