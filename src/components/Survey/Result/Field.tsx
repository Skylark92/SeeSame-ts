/* eslint-disable react/display-name */
import { HTMLAttributes } from 'react';

export default function Field({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      css={{
        width: '100%',
        padding: '1.5rem 0.5rem 1rem',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '0.625rem',
      }}
      {...props}
    >
      {children}
    </section>
  );
}

Field.Title = ({ children, ...props }: HTMLAttributes<HTMLHeadElement>) => {
  return (
    <h3
      css={{
        width: 'fit-content',
        minWidth: '35%',
        height: '1rem',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        margin: '-1.875rem auto 0.625rem',
        padding: '0.0625rem 0.1875rem',
        background: '#00365f',
        outline: '0.125rem solid #00a8ff',
        borderRadius: '1.25rem',
      }}
      {...props}
    >
      {children}
    </h3>
  );
};
