import { css } from '@emotion/react';

export default function Button({ ...props }) {
  return (
    <button
      css={css`
        font-family: NanumSquareAcb;
        font-size: 0.75rem;
        text-align: center;
        color: #000;
        outline: 0.125rem solid rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 0.9375rem;
        padding: 0.25rem 0.625rem;

        position: absolute;
        top: -0.46875rem;
        right: 0.5rem;
        background: #00d1ff;

        pointer-events: auto;
        cursor: pointer;
      `}
      type='button'
      {...props}
    />
  );
}
