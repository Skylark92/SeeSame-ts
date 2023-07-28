import { PropsWithChildren } from 'react';

interface TextProps extends PropsWithChildren {
  content?: string;
}
export default function Text({ content }: TextProps) {
  return <p css={{ lineHeight: 1.6, maxWidth: '21.375rem' }}>{content}</p>;
}
