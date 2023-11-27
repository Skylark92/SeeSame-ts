import { HTMLAttributes } from 'react';
import { font } from 'style/font';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  msg?: string | null;
}

export default function ErrorMessage({ msg, ...props }: ErrorMessageProps) {
  return (
    <p
      css={{
        ...font.p3,
        color: '#f00',
        height: '1rem',
        margin: '0.25rem',
        whiteSpace: 'pre-wrap',
      }}
      {...props}
    >
      {msg}
    </p>
  );
}
