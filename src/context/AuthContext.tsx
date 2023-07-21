import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthServiceInterface, IAuth } from 'services/authService';

const authContext = createContext<IAuthContextReturn | null>(null);
export const useAuth = () => useContext(authContext) as IAuthContextReturn;

// eslint-disable-next-line no-undef
export const AuthProvider = ({ children, authService }: { children: ReactNode; authService: AuthServiceInterface }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signin = authService.signin.bind(authService);
  const signup = authService.signup.bind(authService);
  const signout = authService.signout.bind(authService);
  const signinCallback = async (data: IAuth) => {
    await signin(data);
    setIsAuthenticated(true);
  };
  const signupCallback = async (data: IAuth) => {
    await signup(data);
  };
  const signoutCallback = async () => {
    signout();
    setIsAuthenticated(false);
  };
  useEffect(() => {
    localStorage.getItem('token') ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [localStorage.getItem('token')]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <authContext.Provider
      value={{ isAuthenticated, signin: signinCallback, signup: signupCallback, signout: signoutCallback }}
    >
      {children}
    </authContext.Provider>
  );
};

interface IAuthContextReturn {
  isAuthenticated: boolean;
  signin: (data: IAuth) => Promise<void>;
  signup: (data: IAuth) => Promise<void>;
  signout: () => Promise<void>;
}
