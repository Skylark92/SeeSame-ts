import { useRef, KeyboardEvent, FormEvent } from 'react';
import { Input } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Button from 'components/Button';
import useLogin from 'hooks/useLogin';

export default function Form() {
  const { checkId, isCorrectId, userLogin, isPending, error } = useLogin();
  const idRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const loginStepHandler = async () => {
    const id = idRef.current ? idRef.current.value : '';
    const pass = passRef.current ? passRef.current.value : '';

    if (!isCorrectId) {
      // 아이디 입력 단계
      await checkId(id);
    } else if (isCorrectId) {
      // 비밀번호 입력 단계
      await userLogin(id, pass);
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
      <ErrorMessage css={{ margin: '3px auto 0', height: 'fit-content' }} msg={error} />
      <Button variant='form' disabled={isPending} onClick={loginStepHandler}>
        {isCorrectId ? '로그인' : '계속'}
      </Button>
    </form>
  );
}
