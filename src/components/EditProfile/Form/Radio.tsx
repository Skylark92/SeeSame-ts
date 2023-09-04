import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { color } from 'style/color';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  variant: 'small' | 'large';
  name?: string;
  checked?: boolean;
}

export default function Radio({ id, name, variant, checked, ...props }: Props) {
  if (!variant) return; //

  const size =
    variant === 'small' ? '4.25rem' : variant === 'large' ? '8.625rem' : 0;

  return (
    <div
      css={{
        width: size,
        height: '2.75rem',
        color: 'black',
        display: 'inline-block',
        borderRadius: '0.3125rem',
        overflow: 'hidden',
      }}
      {...props}
    >
      <input
        type='radio'
        id={id}
        name={name}
        value={id}
        checked={checked}
        hidden
      />
      <label
        htmlFor={id}
        css={css`
          display: block;
          width: 100%;
          height: 100%;
          font-family: NanumSquareAceb;
          font-size: 1.25rem;
          text-align: center;
          line-height: 100%;
          padding: 0.625rem;
          border-radius: 0.3125rem;
          transition: background 0.5s ease;

          background: ${color.gray700};

          input:checked + & {
            background: ${color.blue500};
          }
        `}
      >
        {id}
      </label>
    </div>
  );
}
