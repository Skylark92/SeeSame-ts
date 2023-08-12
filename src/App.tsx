import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { RootState } from 'store/store';
import UserMenu from 'components/UserMenu';

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  if (!auth) return;

  return (
    <div
      id='App'
      css={css`
        width: 100%;
        height: 100dvh;
      `}
    >
      {auth.isLogin && pathname !== '/editprofile' && <UserMenu />}
      {<Outlet />}
    </div>
  );
}
