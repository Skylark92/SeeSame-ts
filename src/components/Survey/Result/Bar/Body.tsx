import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { color } from 'style/color';
import { font } from 'style/font';

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export default function Body({ ratio, ...props }: BodyProps) {
  return (
    <div
      css={css`
        width: 100%;
        // line-height: 1.125rem;
        text-align: ${ratio === undefined ? 'center' : 'initial'};
        background: ${ratio === undefined ? 'gray' : color.green900};

        flex: 1 1 ${ratio === undefined ? 100 : ratio < 10 ? 10 : ratio}%;

        &:nth-child(2) {
          background: ${color.violet900};
          direction: rtl;
        }
      `}
      {...props}
    >
      <span
        css={{
          display: 'block',
          width: '100%',
          height: '100%',
          fontFamily: 'NanumSquareAcr',
          fontSize: '0.75rem',
          textIndent: '0.3125rem',
          lineHeight: '1.125rem',
          ...font.stroke,
        }}
      >
        {ratio === 0 ? '0%' : ratio ? ratio + '%' : '-'}
      </span>
    </div>
  );
}
