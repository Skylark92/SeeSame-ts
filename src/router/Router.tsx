import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { surveyLoader } from './loader';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import App from 'App';
import WelcomeView from 'pages/WelcomeView';
import SignUp from 'pages/SignUp';
import EditProfile from 'pages/EditProfile';
import Survey from 'pages/Survey';

export default function Router() {
  const auth = useSelector((state: RootState) => state.auth);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: auth.isLogin ? <Navigate to='/survey' /> : <WelcomeView />,
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
          loader: surveyLoader,
          children: [
            {
              path: ':id',
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
