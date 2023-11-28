import { css } from '@emotion/react';
import Button from 'components/Button';
import { Input } from 'components/Input';
import useLogin from 'hooks/useLogin';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';

export default function Login() {
  const { userLogin, error, isPending } = useLogin();
  const idRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const cardColor = useSelector((state: RootState) => state.color.cardColor);

  const submitHandler = () => {
    const id = idRef.current ? idRef.current.value : '';
    const pass = passRef.current ? passRef.current.value : '';

    userLogin(id, pass);
  };

  const findPasswordAlert = () => {
    alert('죄송합니다. 현재 기능 구현 중에 있습니다.');
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
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        white-space: break-spaces;
        padding: 0.625rem;
        border-radius: 1.25rem;
        gap: 0.5rem;

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
          background: ${cardColor}cc;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          z-index: 25;
          border-radius: 1.25rem;
          transition: background 1.5s;
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
          type='password'
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
      <Button
        variant='form'
        onClick={submitHandler}
        disabled={isPending}
        css={{ margin: '0 auto' }}
      >
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
          margin: '0 auto',
          filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))',
          pointerEvents: 'auto',
        }}
      >
        회원가입 하기
      </Link>
      <p
        css={{
          fontFamily: 'NanumSquareAcr',
          fontSize: '0.875rem',
          textDecoration: 'underline',
        }}
        onClick={findPasswordAlert}
      >
        비밀번호 찾기
      </p>
    </form>
  );
}
