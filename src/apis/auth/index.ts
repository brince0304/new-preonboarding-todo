import client from '../client';

export const signUp = async (auth: IAuth): Promise<boolean> => {
  const res =  await client.post('/auth/signup', auth);
  return res.status === 201;
};

export const signIn = async (auth: IAuth): Promise<IAuthResponse> => {
  const {data} =  await client.post('/auth/signin', auth);
  return data;
};

export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthResponse {
  access_token : string;
}
