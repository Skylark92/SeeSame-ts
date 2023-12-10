import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'store/authSlice';
import login from 'api/user/login';
import isHaveId from 'api/user/isHaveId';

function useLogin() {
  const [isCorrectId, setIsCorrectId] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(' ');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkId = async (id: string) => {
    if (!id) {
      setError('아이디를 입력해주세요.');
      return;
    }

    setIsPending(true);

    // 아이디 입력 단계
    const isHave = await isHaveId(id);
    if (isHave) {
      setIsCorrectId(true); // 아이디가 존재하는 경우 다음 과정
      setIsPending(false);
      setError(' ');
      return;
    } else {
      setIsPending(false);
      setError('아이디가 존재하지 않습니다.');
      return;
    }
  };

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
      dispatch(LOGIN(response.payload));
      setError(' '); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
      if (!response.payload?.profile) {
        navigate('/editprofile'); // 프로필 미작성 유저 작성 유도
      }
    } else {
      if (typeof response.message === 'string') setError(response.message);
      setIsPending(false); // 통신 종료
    }
  };

  return { checkId, isCorrectId, userLogin, isPending, error };
}

export default useLogin;
