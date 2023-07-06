import client from '../client';

export const signUp = async (data: IAuth): Promise<void> => {
  return await client.post('/auth/signup', data);
};

export const signIn = async (data: IAuth): Promise<void> => {
  return await client.post('/auth/signin', data);
};

export interface IAuth {
  email: string;
  password: string;
}
