import client from '../client';

export const signUp = async (data: IAuthProps): Promise<void> => {
  return await client.post('/auth/signup', data);
};

export const signIn = async (data: IAuthProps): Promise<void> => {
  return await client.post('/auth/signin', data);
};

interface IAuthProps {
  email: string;
  password: string;
}
