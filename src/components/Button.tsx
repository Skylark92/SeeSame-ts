import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import { color } from 'style/color';
import xIcon from 'assets/X-icon.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'form' | 'survey' | 'close' | 'custom';
}

export default function Button({ variant = 'custom', ...props }: ButtonProps) {
  return (
    <button
      css={css`
        font-family: NanumSquareAceb;
        text-align: center;
        color: #000;
        margin: 0.1875rem auto;
        outline: 0.1875rem solid rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 0.9375rem;
        ${VARIANTS[variant]}

        pointer-events: auto;
        cursor: pointer;

        &:disabled {
          background: ${color.gray500};
        }
      `}
      type='button'
      {...props}
    />
  );
}

const VARIANTS = {
  form: `
    background: ${color.green500};
    font-size: 1.75rem;
    width: 13.5rem;
    height: 2.875rem;
  `,
  survey: `
    font-size: 1.375rem;
    width: 100%;
    max-width: 11.125rem;
    height: 4.75rem;
  `,
  close: `
    background-color: transparent;
    background-image: url(${xIcon});
    background-size: cover;
    background-position: center;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0;
    outline: none;
  `,
  custom: '',
};
