import { css, keyframes } from '@emotion/react';
import { PropsWithChildren } from 'react';
import Header from './Total/Header';
import Add from './Total/Add';

const slideIn = keyframes`
from {
  height: 0;
  overflow: hidden;
}

to {
  height: 80%;
}
`;

export default function Total({ children, ...props }: PropsWithChildren) {
  return (
    <section
      css={css`
        width: 100%;
        height: 80%;
        color: #141414;
        font-family: 'NanumSquareAcb';
        text-align: left;
        background: white;
        border-radius: 1.25rem;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 100;
        display: flex;
        flex-direction: column;

        animation: ${slideIn} 0.3s ease;
      `}
      {...props}
    >
      <Header />
      <main
        css={{
          height: 'auto',
          fontSize: '0.875rem',
          padding: '1.3125rem 2.625rem 0.75rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '1.1875rem',
        }}
      >
        {children}
      </main>
      <Add />
    </section>
  );
}
