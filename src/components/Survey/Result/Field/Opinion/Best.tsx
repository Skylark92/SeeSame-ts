import { css } from '@emotion/react';
import { Comment } from 'api/type/survey';
import { PropsWithChildren } from 'react';
import profileSprites from 'assets/profile-image-sprites.png';
import firsts from 'assets/comment-1.png';
import seconds from 'assets/comment-2.png';
import thirds from 'assets/comment-3.png';

interface BestProps extends PropsWithChildren {
  data?: Comment;
  index?: number;
}

export default function Best({ data, index = 0 }: BestProps) {
  if (!data) return;
  if (!data.author.profile) return;

  return (
    <div
      css={css`
        text-align: left;
        position: relative;

        &::after {
          content: '';
          display: block;
          width: 1.125rem;
          height: 1.125rem;
          background: url(${prize[index]});
          background-size: 1.125rem 1.125rem;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          right: 0;
        }

        & > * {
          letter-spacing: 0.5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 1.625rem;
          text-indent: 1.5rem;
        }
      `}
    >
      <strong
        css={css`
          display: block;
          width: 100%;
          height: 1rem;
          font-size: 0.6875rem;
          color: #969696;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 1.5rem;
            height: 1.5rem;
            position: absolute;
            background: url(${profileSprites});
            background-size: 4.5rem 4.5rem;
            background-position: ${profile[data.author.profile.profileImage]};
            background-repeat: no-repeat;
            top: -75%;
            left: 0;
          }
        `}
      >
        {data.author.profile?.nickname}
      </strong>
      <p
        css={{
          width: '100%',
          height: '1rem',
          fontSize: '0.6875rem',
          overflow: 'hidden',
        }}
      >
        {data.content}
      </p>
    </div>
  );
}

const prize = [firsts, seconds, thirds];

const profile = {
  'profile-image-01': '0 0;',
  'profile-image-02': '0 -1.5rem',
  'profile-image-03': '0 -3rem',
  'profile-image-04': '-1.5rem 0',
  'profile-image-05': '-1.5rem -1.5rem',
  'profile-image-06': '-1.5rem -3rem',
  'profile-image-07': '-3rem 0',
  'profile-image-08': '-3rem -1.5rem',
  'profile-image-09': '-3rem -3rem',
};
