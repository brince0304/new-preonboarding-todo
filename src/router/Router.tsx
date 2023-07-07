import App from 'App';
import ErrorPage from 'pages/ErrorPage';
import { useAuthState } from 'context';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Todo from 'pages/Todo';
import SignOut from 'pages/SignOut';

const PrivateRouteProvider = () => {
  const authState = useAuthState();
  const router = createBrowserRouter([
    {
      path: routeLink.main,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: authState.token ? <Navigate to={routeLink.todo} replace={true} /> : <Navigate to={routeLink.signIn} replace={true} />,
        },
        {
          path: routeLink.signIn,
          element: authState.token ? <Navigate to={routeLink.todo} replace={true} /> : <SignIn />,
        },
        {
          path: routeLink.signUp,
          element: authState.token ? <Navigate to={routeLink.todo} replace={true} /> : <SignUp />,
        },
        {
          path: routeLink.todo,
          element: authState.token ? <Todo /> : <Navigate to={routeLink.signIn} replace={true} />,
        },
        {
          path: '/*',
          element: <Navigate to={routeLink.signIn} replace={true} />,
        },
        {
          path: routeLink.signOut,
          element: authState.token === null ? <Navigate to={routeLink.signIn} replace={true} /> : <SignOut />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export const routeLink = {
  signIn: '/signin',
  signUp: '/signup',
  todo: '/todo',
  signOut: '/signout',
  main: '/',
};

export default PrivateRouteProvider;
