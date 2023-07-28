import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';

export default function Slide({ children }: PropsWithChildren) {
  return (
    <section
      css={css`
        width: 100%;
        height: 100%;

        & > * {
          scroll-snap-stop: always;
          scroll-snap-align: center;
        }
      `}
    >
      {children}
    </section>
  );
}
