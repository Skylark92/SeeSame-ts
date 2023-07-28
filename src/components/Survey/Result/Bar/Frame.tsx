import { PropsWithChildren } from 'react';

export default function Frame({ children, ...props }: PropsWithChildren) {
  return (
    <div
      css={{
        width: '100%',
        height: '1.125rem',
        display: 'flex',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
