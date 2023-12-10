import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { color } from 'style/color';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  variant: 'small' | 'large';
  name?: string;
  checked?: boolean;
}

interface LabelColor {
  [key: string]: string;
}

export default function Radio({ id, name, variant, checked, ...props }: Props) {
  if (!variant) return; //

  const size = variant === 'small' ? '4.25rem' : variant === 'large' ? '8.625rem' : 0;

  const labelColor: LabelColor = {
    남자: '#00d1ff',
    여자: '#ff5e84',
    '10대': '#ffd977',
    '20대': '#ffcc4a',
    '30대': '#fec42f',
    '40대': '#fdba0d',
    청춘: '#fff500',
  };

  return (
    <div
      css={{
        width: size,
        height: '2.125rem',
        color: 'black',
        display: 'inline-block',
        borderRadius: '0.3125rem',
        overflow: 'hidden',
      }}
      {...props}
    >
      <input type='radio' id={id} name={name} value={id} checked={checked} hidden />
      <label
        htmlFor={id}
        css={css`
          display: block;
          width: 100%;
          height: 100%;
          font-family: NanumSquareAceb;
          font-size: 1.25rem;
          text-align: center;
          line-height: 2.125rem;
          // padding: 0.625rem;
          border-radius: 0.3125rem;
          transition: background 0.5s ease;

          background: ${color.disabledButton};

          input:checked + & {
            background: ${labelColor[id] || '#f7fa81'};
          }
        `}
      >
        {id}
      </label>
    </div>
  );
}
