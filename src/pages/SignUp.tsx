import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { color } from 'style/color';
import Header from 'components/Header';
import Form from 'components/SignUp/Form';

export default function SignUp() {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLogin) {
      if (!auth.user?.profile) {
        navigate('/editprofile');
      } else {
        navigate('/survey');
      }
    }
  }, [auth]);

  if (auth.isLogin) {
    return <h1>Redirects...</h1>;
  }

  return (
    <main
      id='sign-up'
      css={{
        background: color.blue700,
        padding: '4.375rem 1.0625rem',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Header backButton>회원 가입</Header>
      <Form />
    </main>
  );
}
