import { PropsWithChildren } from 'react';

interface TextProps extends PropsWithChildren {
  content?: string;
}
export default function Text({ content }: TextProps) {
  return (
    <p
      css={{
        width: '22.5rem',
        height: '10.75rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'break-spaces',
        lineHeight: 1.6,
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '0.625rem',
        padding: '0.375rem 0.5625rem',
      }}
    >
      {content}
    </p>
  );
}
