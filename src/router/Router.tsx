import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import App from 'App';
import WelcomeView from 'pages/WelcomeView';
import SignUp from 'pages/SignUp';
import EditProfile from 'pages/EditProfile';
import Survey from 'pages/Survey';
import AddSurvey from 'pages/AddSurvey';

export default function Router() {
  const auth = useSelector((state: RootState) => state.auth);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: auth.user?.profile ? <Navigate to='/survey' /> : <WelcomeView />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
        {
          path: 'editprofile',
          element: auth.isLogin ? <EditProfile /> : <Navigate to='/' />,
        },
        {
          path: 'survey',
          element: <Survey />,
          children: [
            {
              path: ':id',
            },
          ],
        },
        {
          path: 'add',
          element: auth.user?.admin ? <AddSurvey /> : <Navigate to='/error' />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
