import { useState, useRef, KeyboardEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'store/authSlice';
import { Input } from 'components/Input';
import login from 'api/user/login';
import isHaveId from 'api/user/isHaveId';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';

export default function Form() {
  const [isCorrectId, setIsCorrectId] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(' ');
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
        if (!res.payload?.profile) {
          dispatch(LOGIN(res.payload));
          navigate('/editprofile');
          setIsPending(false);
          setErrorMsg(' ');
          return;
        }
        dispatch(LOGIN(res.payload));
        setIsPending(false);
        setErrorMsg(' ');
        navigate('/survey');
        return;
      } else {
        setIsPending(false);
        setErrorMsg('비밀번호가 틀렸습니다.');
        return;
      }
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const keydownHandler = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      loginStepHandler();
    }
  };

  return (
    <form
      css={{
        maxWidth: '13.5rem',
        margin: '0.875rem auto 0',
      }}
      onSubmit={submitHandler}
      onKeyDown={keydownHandler}
    >
      <Input css={{ marginTop: isCorrectId ? '0' : '2.5rem' }}>
        <Input.TextField
          css={{ height: '2.125rem' }}
          ref={idRef}
          id='welcome-view-id'
          type='text'
          placeholder='사용자 아이디'
          disabled={isCorrectId}
        />
      </Input>

      {isCorrectId && (
        <Input css={{ marginTop: '0.375rem' }}>
          <Input.TextField
            css={{ height: '2.125rem' }}
            ref={passRef}
            id='welcome-view-papssword'
            type='password'
            placeholder='비밀번호 입력'
          />
        </Input>
      )}
      <ErrorMessage
        css={{ margin: '3px auto 0', height: 'fit-content' }}
        msg={errorMsg}
      />
      <Button variant='form' disabled={isPending} onClick={loginStepHandler}>
        {isCorrectId ? '로그인' : '계속'}
      </Button>
    </form>
  );
}
