import { PropsWithChildren } from 'react';

interface TextProps extends PropsWithChildren {
  content?: string;
}
export default function Text({ content }: TextProps) {
  return (
    <p
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '21.375rem',
        whiteSpace: 'break-spaces',
        lineHeight: 1.6,
      }}
    >
      {content}
    </p>
  );
}
