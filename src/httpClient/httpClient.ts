import { TokenRepositoryInterface } from 'repositories/tokenRepository';

export interface HttpClientInterface {
  fetch(url: string, options: any): Promise<Response>;
  get(url: string): Promise<Response>;
  post(url: string, body: any): Promise<Response>;
  put(url: string, body: any): Promise<Response>;
  delete(url: string): Promise<Response>;
}

export class HttpClient implements HttpClientInterface {
  baseURL: string;
  tokenRepository: TokenRepositoryInterface;
  constructor(baseURL: string, tokenRepository: TokenRepositoryInterface) {
    this.baseURL = baseURL;
    this.tokenRepository = tokenRepository;
  }

  async fetch(url: string, options: any = {}) {
    return window.fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.tokenRepository.getToken()}`,
        ...options.headers,
      },
    });
  }

  async get(url: string): Promise<Response> {
    const response = await this.fetch(url, {
      method: 'GET',
    });
    return response;
  }
  post(url: string, body: any): Promise<Response> {
    const response = this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return response;
  }
  put(url: string, body: any): Promise<Response> {
    const response = this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return response;
  }
  delete(url: string): Promise<Response> {
    const response = this.fetch(url, {
      method: 'DELETE',
    });
    return response;
  }
}
