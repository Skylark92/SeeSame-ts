import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN } from 'store/authSlice';
import login from 'api/user/login';

function useLogin() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string>(' ');
  const dispatch = useDispatch();

  const userLogin = async (id: string, password: string) => {
    if (!id) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setIsPending(true); // 통신 시작

    const response = await login(id, password); // 로그인 요청

    if (response.ok) {
      // 로그인 성공 시 상태 업데이트
      dispatch(LOGIN(response.user));
      setError(' '); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
    } else {
      if (typeof response.message === 'string') setError(response.message);
      setIsPending(false); // 통신 종료
    }
  };

  return { userLogin, isPending, error };
}

export default useLogin;
