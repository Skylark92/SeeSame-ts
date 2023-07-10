import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from 'App';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <h1>첫화면</h1>
        },
        {
          path: 'signup',
          element: <h1>signup</h1>
        },
        {
          path: 'editprofile',
          element: <h1>editprofile</h1>
        },
        {
          path: 'survey/:id',
          element: <h1>survey/:id</h1>
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}
