import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'store/store';

export default function App() {
  const auth = useSelector((state: RootState) => state.auth);
  if (!auth) return;

  return (
    <div
      id='App'
      css={{
        width: '100%',
        height: '100%',
      }}
    >
      {<Outlet />}
    </div>
  );
}
