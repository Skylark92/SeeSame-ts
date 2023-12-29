/* eslint-disable react/display-name */
import { HTMLAttributes } from 'react';

export default function Field({
  children,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      css={{
        width: 'fit-content',
        background: 'rgba(0, 0, 0, 0.4)',
        margin: '0.625rem auto',
        padding: '0.1875rem 0.375rem 0.625rem 0.375rem',
        border: '1px solid #000',
        borderRadius: '0.625rem',
      }}
      {...props}
    >
      {children}
    </fieldset>
  );
}

Field.Title = ({ children, ...props }: { children: React.ReactNode } & HTMLAttributes<HTMLHeadElement>) => {
  return (
    <h3
      css={{
        fontFamily: 'NanumSquareAcr',
        fontSize: '0.875rem',
        paddingTop: '0.25rem',
        marginBottom: '0.3125rem',
      }}
      {...props}
    >
      {children}
    </h3>
  );
};

Field.Radio = ({ children, ...props }: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div css={{ display: 'flex', gap: '0.375rem' }} {...props}>
      {children}
    </div>
  );
};
