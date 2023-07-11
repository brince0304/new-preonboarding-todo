export interface TokenRepositoryInterface {
    setToken(token: string): void;
    getToken(): string | null;
    removeToken(): void;
}

export class TokenRepository implements TokenRepositoryInterface{
    // @ts-ignore
    #TOKEN = 'token'
    setToken(token: string): void {
        localStorage.setItem(this.#TOKEN, token);
    }
    getToken(): string | null {
        return localStorage.getItem(this.#TOKEN);
    }
    removeToken(): void {
        localStorage.removeItem(this.#TOKEN);
    }

}