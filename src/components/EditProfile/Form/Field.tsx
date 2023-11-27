import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
}

export default function Field({ title, children, ...props }: Props) {
  return (
    <fieldset
      css={{
        width: 'fit-content',
        background: 'rgba(0, 0, 0, 0.4)',
        margin: '0 auto',
        padding: '0.125rem 0.375rem 0.625rem 0.375rem',
        border: '1px solid #000',
        borderRadius: '0.625rem',
      }}
      {...props}
    >
      <legend
        css={{
          fontFamily: 'NanumSquareAcr',
          fontSize: '0.875rem',
          paddingTop: '1.5625rem',
          marginBottom: '0.3125rem',
        }}
      >
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
