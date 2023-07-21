import { HttpClientInterface } from 'httpClient/httpClient';
import { TokenRepositoryInterface } from 'repositories/tokenRepository';

export interface AuthServiceInterface {
  signup(auth: IAuth): Promise<void>;
  signin(auth: IAuth): Promise<void>;
  signout(): void;
}

export class AuthService implements AuthServiceInterface {
  httpClient: HttpClientInterface;
  tokenRepository: TokenRepositoryInterface;
  constructor(httpClient: HttpClientInterface, tokenRepository: TokenRepositoryInterface) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signup(auth: IAuth) {
    const result = await this.httpClient.post('auth/signup', auth);
    if (!result.ok) {
      throw new Error(result.statusText);
    }
  }

  async signin(auth: IAuth) {
    const result = await this.httpClient.post('auth/signin', auth);
    if (!result.ok) {
      throw new Error('Invalid credentials');
    }
    const { access_token } = await result.json();
    this.tokenRepository.setToken(access_token);
  }

  signout() {
    this.tokenRepository.removeToken();
  }
}

export interface IAuth {
  email: string;
  password: string;
}
