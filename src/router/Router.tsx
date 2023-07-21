import App from 'App';
import ErrorPage from 'pages/ErrorPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import Todo from 'pages/Todo';
import SignOut from 'pages/SignOut';
import { useAuth } from 'context/AuthContext';

const PrivateRouteProvider = () => {
  const { isAuthenticated } = useAuth();
  const router = createBrowserRouter([
    {
      path: routeLink.main,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: isAuthenticated ? (
            <Navigate to={routeLink.todo} replace={true} />
          ) : (
            <Navigate to={routeLink.signIn} replace={true} />
          ),
        },
        {
          path: routeLink.signIn,
          element: isAuthenticated ? <Navigate to={routeLink.todo} replace={true} /> : <SignIn />,
        },
        {
          path: routeLink.signUp,
          element: isAuthenticated ? <Navigate to={routeLink.todo} replace={true} /> : <SignUp />,
        },
        {
          path: routeLink.todo,
          element: isAuthenticated ? <Todo /> : <Navigate to={routeLink.signIn} replace={true} />,
        },
        {
          path: '/*',
          element: <Navigate to={routeLink.signIn} replace={true} />,
        },
        {
          path: routeLink.signOut,
          element: !isAuthenticated ? <Navigate to={routeLink.signIn} replace={true} /> : <SignOut />,
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
