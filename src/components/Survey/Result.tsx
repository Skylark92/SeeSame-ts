import { css, keyframes } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { color } from 'style/color';
import Button from 'components/Button';
import Brief from './Result/Brief';
import Total from './Result/Field/Total';
import Gender from './Result/Field/Gender';
import MBTI from './Result/Field/MBTI';
import Opinion from './Result/Field/Opinion';

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
  return (
    <article
      css={css`
        width: 100%;
        height: 100%;
        background: ${color.blue700};
        border-radius: 1.25rem;
        position: absolute;
        top: 0;
        left: 0;
        padding: 0.375rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.1875rem;

        font-family: NanumSquareAcr;

        animation: ${slideIn} 0.5s ease;
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
    </article>
  );
}
