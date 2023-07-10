import { Outlet } from 'react-router-dom';

export default function App() {
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
