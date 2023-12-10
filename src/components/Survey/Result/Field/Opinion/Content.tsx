import { css } from '@emotion/react';
import { HTMLAttributes, useContext } from 'react';
import profileSprites from 'assets/profile-image-sprites.png';
import { CommentLoaded } from 'api/type';
import Button from 'components/Button';
import likeIcon from 'assets/like-icon.svg';
import CommentContext from 'context/CommentContext';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import unlikeComment from 'api/survey/comment/unlikeComment';
import SurveyContext from 'context/SurveyContext';
import likeComment from 'api/survey/comment/likeComment';
import { badge, grade } from './badge';

interface ContentProps extends HTMLAttributes<HTMLElement> {
  data?: CommentLoaded;
}

export default function Content({ data, ...props }: ContentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const survey = useContext(SurveyContext)?.data;
  const context = useContext(CommentContext);
  const comments = context?.data;
  const setComments = context?.setData;

  if (!user) return;
  if (!data) return;
  if (!comments) return;
  if (!data.author.profile) return;

  const index = comments.findIndex((v) => v._id === data._id);

  const likeHandler = async () => {
    if (!(user && survey && data && setComments)) return;

    if (data.users[user._id]) {
      const res = await unlikeComment(survey._id, data._id, user);
      if (res.ok) {
        const update = [res.payload, ...comments.filter((c) => c._id !== res.payload?._id)] as CommentLoaded[];
        setComments(update.sort((a, b) => +a.createdAt - +b.createdAt).sort((a, b) => b.like - a.like));
      } else {
        console.log(res.message);
      }
    } else if (!data.users[user._id]) {
      const res = await likeComment(survey._id, data._id, user);
      if (res.ok) {
        const update = [res.payload, ...comments.filter((c) => c._id !== res.payload?._id)] as CommentLoaded[];
        setComments(update.sort((a, b) => +a.createdAt - +b.createdAt).sort((a, b) => b.like - a.like));
      } else {
        console.log(res.message);
      }
    }
  };

  return (
    <article
      {...props}
      css={css`
        transition: 0.3s;
      `}
    >
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

          &::after {
            ${badge}
            ${grade[index]}
            right: -1.4375rem;
          }
        `}
      >
        {data.author.profile?.nickname}
      </strong>
      <p css={{ marginTop: '0.25rem' }}>{data.content}</p>
      <div
        css={css`
          display: flex;
          width: fit-content;
          margin-top: 0.375rem;
          cursor: pointer;
        `}
      >
        <Button
          css={css`
            width: 1rem;
            height: 1rem;
            background: url(${likeIcon});
            background-size: contain;
            background-repeat: no-repeat;
            border-radius: 0;
            filter: none;
            margin: 0;
            margin-top: -0.0625rem;
          `}
          onClick={likeHandler}
        />
        <span
          css={css`
            color: ${data.users[user._id] ? 'black' : '#aeaeae'};
            line-height: normal;
            text-indent: 0.1875rem;
          `}
        >
          {data.like}
        </span>
      </div>
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
