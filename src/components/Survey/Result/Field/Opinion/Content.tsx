import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import profileSprites from 'assets/profile-image-sprites.png';
import { CommentLoaded } from 'api/type';

interface ContentProps extends HTMLAttributes<HTMLElement> {
  data?: CommentLoaded;
}

export default function Content({ data, ...props }: ContentProps) {
  if (!data) return;
  if (!data.author.profile) return;

  return (
    <article {...props}>
      <strong
        css={css`
          display: block;
          width: 100%;
          height: 1rem;
          color: #aeaeae;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 2.125rem;
            height: 2.125rem;
            position: absolute;
            background: url(${profileSprites});
            background-size: 6.375rem 6.375rem;
            background-position: ${profile[data.author.profile.profileImage]};
            background-repeat: no-repeat;
            top: -70%;
            left: -2.375rem;
          }
        `}
      >
        {data.author.profile?.nickname}
      </strong>
      <p css={{ marginTop: '0.25rem' }}>{data.content}</p>
    </article>
  );
}

const profile = {
  'profile-image-01': '0 0;',
  'profile-image-02': '0 -2.125rem',
  'profile-image-03': '0 -4.25rem',
  'profile-image-04': '-2.125rem 0',
  'profile-image-05': '-2.125rem -2.125rem',
  'profile-image-06': '-2.125rem -4.25rem',
  'profile-image-07': '-4.25rem 0',
  'profile-image-08': '-4.25rem -2.125rem',
  'profile-image-09': '-4.25rem -4.25rem',
};
