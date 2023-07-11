import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PrivateRouteProvider from 'router/Router';
import { AuthProvider } from 'context/AuthContext';
import { TodoProvider } from 'context/TodoContext';
import { HttpClient } from 'httpClient/httpClient';
import { TokenRepository } from 'repositories/tokenRepository';
import { AuthService } from 'services/authService';
import { TodoService } from 'services/todoService';

const baseURL = 'https://www.pre-onboarding-selection-task.shop/';
const tokenRepository = new TokenRepository();
const httpClient = new HttpClient(baseURL, tokenRepository);
const authService = new AuthService(httpClient, tokenRepository);
const todoService = new TodoService(httpClient, tokenRepository);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider authService={authService}>
    <TodoProvider todoService={todoService}>
      <PrivateRouteProvider />
    </TodoProvider>
  </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
