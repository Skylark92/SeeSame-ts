import { css } from '@emotion/react';
import {
  KeyboardEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from 'components/Button';
import modifyIcon from 'assets/modify-icon.svg';

interface InputProps extends PropsWithChildren {
  nickname?: string;
}

export default function Input({ nickname, ...props }: InputProps) {
  const [isModify, setIsModify] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModify) {
      inputRef.current?.focus();
    }
  }, [isModify]);

  const keypressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsModify(!isModify);
    }
  };

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '13.5rem',
        margin: '0.9375rem auto',
        position: 'relative',
      }}
      {...props}
    >
      <input
        name='nickname'
        css={css`
          display: block;
          width: 100%;
          height: 1.75rem;
          background: rgba(0, 0, 0, 0.1);
          padding: 0.3125rem 0.1875rem;
          font-size: 16px;
          font-family: 'NanumSquareAcb';
          color: #fff;
          text-align: center;
          border: none;
          border-radius: 0.3125rem;
          transition: background 0.2s ease;

          &:disabled {
            background: rgba(0, 0, 0, 0.4);
          }
          &:focus {
            outline: none;
          }
        `}
        type='text'
        disabled={!isModify}
        ref={inputRef}
        maxLength={10}
        value={nickname}
        onKeyDownCapture={keypressHandler}
      />
      <Button
        variant='custom'
        css={{
          width: '1.375rem',
          height: '1.375rem',
          borderRadius: '0.3125rem',
          position: 'absolute',
          top: 0,
          right: '0.1875rem',
          background: `url(${modifyIcon})`,
          backgroundSize: '1.375rem 1.375rem',
          backgroundRepeat: 'no-repeat',
          zIndex: 500,
        }}
        onClick={() => setIsModify(!isModify)}
      />
    </div>
  );
}
