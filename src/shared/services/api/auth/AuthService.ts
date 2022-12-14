import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get('/auth', { data: { email, password } });
    console.log('data', data);
    if (data) {
      return data;
    }
    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'erro no login.');
  }
};

export const AuthService = {
  auth,
};
