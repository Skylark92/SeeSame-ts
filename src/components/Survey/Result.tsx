import { css, keyframes } from '@emotion/react';
import { PropsWithChildren } from 'react';
import Button from 'components/Button';
import Brief from './Result/Brief';
import Total from './Result/Field/Total';
import Gender from './Result/Field/Gender';
import MBTI from './Result/Field/MBTI';
import Opinion from './Result/Field/Opinion';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Login from './Result/Login';

interface ResultProps extends PropsWithChildren {
  handler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const slideIn = keyframes`
from {
  opacity: 0;
  transform: translateX(100%);
}

to {
  opacity: 1;
  transform: translateX(0%);
}
`;

export default function Result({ handler, ...props }: ResultProps) {
  const isLogin = useSelector((state: RootState) => state.auth).isLogin;
  const cardColor = useSelector((state: RootState) => state.color.cardColor);

  return (
    <article
      css={css`
        width: 100%;
        height: 100%;
        background: ${cardColor};
        border-radius: 1.25rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.375rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 1.1875rem;

        font-family: NanumSquareAcr;

        animation: ${slideIn} 0.5s ease;
        transition: background 1.5s;
      `}
      {...props}
    >
      <Button
        variant='close'
        css={{
          position: 'absolute',
          top: '0.875rem',
          right: '0.875rem',
        }}
        onClick={handler}
      />
      <Brief />
      <Total />
      <Gender />
      <MBTI />
      <Opinion />
      {isLogin || <Login />}
    </article>
  );
}
