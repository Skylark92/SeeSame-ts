import { css } from '@emotion/react';
import Button from 'components/Button';
import { Input } from 'components/Input';
import { Link } from 'react-router-dom';

export default function Login() {
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
        <Input.TextField css={{ fontSize: '1.25rem' }} placeholder='아이디' />
      </Input>
      <Input css={{ width: 'calc(100% - 38px)' }}>
        <Input.TextField css={{ fontSize: '1.25rem' }} placeholder='비밀번호' />
      </Input>
      <p
        css={{
          width: '100%',
          color: '#f00',
          textAlign: 'center',
          fontSize: '0.875rem',
        }}
      >
        비밀번호가 틀렸습니다.
      </p>
      <Button variant='form'>로그인</Button>
      <Button
        variant='form'
        css={{ fontSize: '1.125rem', height: '2.25rem', background: '#24E5FF' }}
      >
        회원가입 하기
      </Button>
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
