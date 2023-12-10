import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import { color } from 'style/color';
import closeButton from 'assets/close-button.png';

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
        // outline: 0.1875rem solid rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 0.625rem;
        filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
        ${VARIANTS[variant]}

        pointer-events: auto;
        cursor: pointer;

        &:disabled {
          background: ${color.disabledButton};
        }
      `}
      type='button'
      {...props}
    />
  );
}

const VARIANTS = {
  form: `
    background: ${color.choiceA};
    font-size: 1.25rem;
    width: 13.5rem;
    height: 2.875rem;
  `,
  survey: `
    font-size: 1.25rem;
    width: 100%;
    max-width: 11.125rem;
    height: 4.25rem;
  `,
  close: `
    background-color: transparent;
    background-image: url(${closeButton});
    background-size: cover;
    background-position: center;
    width: 1.375rem;
    height: 1.375rem;
    border-radius: 0;
    outline: none;
    margin: 0;
    
    position: absolute;
    top: 0.875rem;
    right: 0.875rem;
  `,
  custom: '',
};
