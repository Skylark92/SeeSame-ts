import { css } from '@emotion/react';
import Button from 'components/Button';
import { Input } from 'components/Input';
import useLogin from 'hooks/useLogin';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const { userLogin, error, isPending } = useLogin();
  const idRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const id = idRef.current ? idRef.current.value : '';
    const pass = passRef.current ? passRef.current.value : '';

    userLogin(id, pass);
  };

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 60%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        white-space: break-spaces;
        padding: 0.625rem;
        border-radius: 0.9375rem;
        gap: 0.625rem;

        & > * {
          z-index: 30;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(38, 143, 223, 0.8);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          z-index: 25;
          border-radius: 0 0 1.25rem 1.25rem;
        }
      `}
    >
      <p
        css={{
          width: '100%',
          margin: '0.875rem auto',
          lineHeight: '1.875rem',
          fontSize: '1.375rem',
          textShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
        }}
      >
        로그인 하시거나 회원 가입하시면
        <br />
        다른 재미있는 논쟁에 대한
        <br />
        답도 보실 수 있습니다.
      </p>
      <Input css={{ width: 'calc(100% - 38px)' }}>
        <Input.TextField
          css={{ fontSize: '1.25rem' }}
          placeholder='아이디'
          ref={idRef}
        />
      </Input>
      <Input css={{ width: 'calc(100% - 38px)' }}>
        <Input.TextField
          css={{ fontSize: '1.25rem' }}
          placeholder='비밀번호'
          ref={passRef}
        />
      </Input>
      <p
        css={{
          width: '100%',
          color: '#f00',
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        {error}
      </p>
      <Button variant='form' onClick={submitHandler} disabled={isPending}>
        로그인
      </Button>
      <Link
        to='/signup'
        css={{
          fontFamily: 'NanumSquareAceb',
          fontSize: '1.125rem',
          textAlign: 'center',
          color: '#000',
          width: '13.5rem',
          height: '2.25rem',
          lineHeight: '2.25rem',
          background: '#24E5FF',
          border: 'none',
          borderRadius: '0.625rem',
          margin: '0.1875rem auto',
          filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))',
          pointerEvents: 'auto',
        }}
      >
        회원가입 하기
      </Link>
      <Link
        to='/signup'
        css={{
          fontFamily: 'NanumSquareAcr',
          fontSize: '0.875rem',
          textDecoration: 'underline',
        }}
      >
        비밀번호 찾기
      </Link>
    </form>
  );
}
