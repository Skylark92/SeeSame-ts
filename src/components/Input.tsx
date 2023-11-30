/* eslint-disable react/display-name */

import { css } from '@emotion/react';
import {
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
} from 'react';
import { color } from 'style/color';
import { font } from 'style/font';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  label?: ReactNode;
}

export function Input({ label, children, ...props }: InputProps) {
  const child = Children.only(children);
  const id = child.props.id;

  return (
    <div css={{ width: '100%' }} {...props}>
      {label && (
        <label
          htmlFor={id}
          css={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            fontSize: '1rem',
            color: color.blue300,
            textIndent: '0.25rem',
            marginBottom: '2px',
          }}
        >
          {label}
        </label>
      )}
      {cloneElement(child, { id, ...child.props })}
    </div>
  );
}

Input.TextField = forwardRef(
  (
    { ...props }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <input
        css={css`
          font-family: ${font.input.fontFamily};
          font-size: ${font.input.fontSize};
          text-indent: 0.4375rem;
          display: block;
          width: 100%;
          height: 2.75rem;
          background: #fff;
          border: none;
          border-radius: 0.3125rem;
          transition: background 0.3s ease;

          &::placeholder {
            color: #b2b2b2;
          }
          &:disabled {
            background: ${color.gray300};
          }
          &:focus {
            outline: none;
          }
        `}
        ref={ref}
        autoCapitalize='off'
        {...props}
      />
    );
  },
);
