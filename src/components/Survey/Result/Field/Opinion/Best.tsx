import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import profileSprites from 'assets/profile-image-sprites.png';
import firsts from 'assets/comment-1.png';
import seconds from 'assets/comment-2.png';
import thirds from 'assets/comment-3.png';
import { CommentLoaded } from 'api/type';

interface BestProps extends PropsWithChildren {
  data?: CommentLoaded;
  index?: number;
}

export default function Best({ data, index = 0 }: BestProps) {
  if (!data) return;
  if (!data.author.profile) return;

  return (
    <div
      css={css`
        text-align: left;
        padding-top: 0.125rem;
        position: relative;

        &::after {
          content: '';
          display: block;
          width: 1.25rem;
          height: 1.25rem;
          background: url(${prize[index]});
          background-size: 1.125rem 1.125rem;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
        }

        & > * {
          letter-spacing: 0.5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-indent: 1.5rem;
        }
      `}
    >
      <strong
        css={css`
          display: block;
          width: 100%;
          height: 1rem;
          font-family: 'NanumSquareAcb';
          font-size: 0.6875rem;
          line-height: 1rem;
          color: #969696;
          margin: 0 0 0.125rem 0.125rem;

          &::before {
            content: '';
            display: inline-block;
            width: 0.625rem;
            height: 0.625rem;
            background: url(${profileSprites});
            background-size: 1.875rem 1.875rem;
            background-position: ${profile[data.author.profile.profileImage]};
            background-repeat: no-repeat;
            scale: 1.8;
            margin-right: 0.375rem;
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
          paddingRight: '33px',
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
  'profile-image-02': '0 -0.625rem',
  'profile-image-03': '0 -1.25rem',
  'profile-image-04': '-0.625rem 0',
  'profile-image-05': '-0.625rem -0.625rem',
  'profile-image-06': '-0.625rem -1.25rem',
  'profile-image-07': '-1.25rem 0',
  'profile-image-08': '-1.25rem -0.625rem',
  'profile-image-09': '-1.25rem -1.25rem',
};
