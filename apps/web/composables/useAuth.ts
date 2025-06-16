import api from '~/services/api';

export const useAuth = () => {
  const token = useCookie('token');
  const user = useState<AuthUser | null>('user', () => null);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.login({ email, password });

      token.value = res.accessToken;
      user.value = res.user;
      return res;
    } catch (err) {
      console.error('Erro no login:', err);
      throw err;
    }
  };

  const signup = async (email: string, password: string, confirmPassword: string, name: string) => {
    try {
      const res = await api.signup({ email, password, confirmPassword, name });

      console.log(res);

      token.value = res.accessToken;
      user.value = res.user;
      return res;
    } catch (err) {
      console.error('Erro no signup:', err);
      throw err;
    }
  };

  return { login, signup, token, user };
};
