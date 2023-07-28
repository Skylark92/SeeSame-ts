import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'store/authSlice';
import { Input } from 'components/Input';
import login from 'api/user/login';
import isHaveId from 'api/user/isHaveId';
import ErrorMessage from 'components/ErrorMessage';
import Join from './Form/Join';
import Guest from './Form/Guest';
import Button from 'components/Button';

export default function Form() {
  const [isCorrectId, setIsCorrectId] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const loginStepHandler = async () => {
    const id = idRef.current ? idRef.current.value : null;
    const pass = passRef.current ? passRef.current.value : null;

    if (!id) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }

    setIsPending(true);

    if (!isCorrectId) {
      // 아이디 입력 단계
      const isHave = await isHaveId(id);
      if (isHave) {
        setIsCorrectId(true); // 아이디가 존재하는 경우 다음 과정
        setIsPending(false);
        setErrorMsg(' ');
        return;
      } else {
        setIsPending(false);
        setErrorMsg('아이디가 존재하지 않습니다.');
        return;
      }
    } else if (isCorrectId) {
      if (!pass) {
        setErrorMsg('비밀번호를 입력해주세요.');
        return;
      }
      // 비밀번호 입력 단계
      const res = await login(id, pass);
      if (res.ok) {
        if (!res.user?.profile) {
          dispatch(LOGIN(res.user));
          navigate('/editprofile');
          setIsPending(false);
          setErrorMsg(' ');
          return;
        }
        dispatch(LOGIN(res.user));
        setIsPending(false);
        setErrorMsg(' ');
        navigate('/survey');
        return;
      } else {
        setIsPending(false);
        setErrorMsg(res.message);
        return;
      }
    }
  };

  return (
    <form
      css={{
        maxWidth: '13.5rem',
        margin: '1.25rem auto 0',
      }}
    >
      <Input css={{ marginTop: isCorrectId ? '0' : '3.375rem' }}>
        <Input.TextField
          ref={idRef}
          id='welcome-view-id'
          type='text'
          placeholder='사용자 아이디'
          disabled={isCorrectId}
        />
      </Input>

      {isCorrectId && (
        <Input css={{ marginTop: '0.625rem' }}>
          <Input.TextField
            ref={passRef}
            id='welcome-view-papssword'
            type='password'
            placeholder='비밀번호 입력'
          />
        </Input>
      )}
      <ErrorMessage msg={errorMsg} />
      <Button variant='form' disabled={isPending} onClick={loginStepHandler}>
        {isCorrectId ? '로그인' : '계속'}
      </Button>
      <Join />
      <Guest />
    </form>
  );
}
