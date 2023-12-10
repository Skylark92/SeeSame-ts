import { HTMLAttributes } from 'react';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  msg?: string | null;
}

export default function ErrorMessage({ msg, ...props }: ErrorMessageProps) {
  return (
    <p
      css={{
        fontSize: '0.75rem',
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
