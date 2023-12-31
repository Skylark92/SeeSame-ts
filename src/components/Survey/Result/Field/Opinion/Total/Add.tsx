import { css } from '@emotion/react';
import { KeyboardEvent, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Button from 'components/Button';
import SurveyContext from 'context/SurveyContext';
import CommentContext from 'context/CommentContext';
import profileSprites from 'assets/profile-image-sprites.png';
import useComment from 'hooks/useComment';
import sendCommentIcon from 'assets/send-comment-icon.svg';

export default function Add() {
  const contentRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const survey = useContext(SurveyContext)?.data;
  const comment = useContext(CommentContext)?.data;
  const setComment = useContext(CommentContext)?.setData;
  const { sendComment, isPending } = useComment();

  const submitHandler = async () => {
    if (!contentRef.current?.value) return;
    if (!(user && survey)) return;

    const res = await sendComment(contentRef.current.value, survey._id, user);
    contentRef.current.value = '';

    if (!(comment && setComment)) return alert('뭔가 잘못됐습니다!');

    if (res) {
      setComment([...comment, res]);
    }
  };

  const keydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitHandler();
    }
  };

  if (!user) return;
  if (!user.profile) return;

  return (
    <div
      css={{
        flex: '1 1 0',
        width: '100%',
        height: '7.0625rem',
        padding: '1.25rem 0.5625rem 0.875rem',
        borderTop: '1px solid #d9d9d9',
      }}
    >
      <strong
        css={css`
          display: block;
          width: 100%;
          height: 1rem;
          font-size: 0.875rem;
          color: #999;
          padding-left: 2.125rem;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 2.125rem;
            height: 2.125rem;
            position: absolute;
            background: url(${profileSprites});
            background-size: 6.375rem 6.375rem;
            background-position: ${profile[user.profile.profileImage]};
            background-repeat: no-repeat;
            top: -70%;
            left: 0;
          }
        `}
      >
        {user.profile.nickname}
      </strong>
      <form css={{ display: 'flex', marginTop: '0.5625rem', gap: '0.375rem' }}>
        <input
          css={css`
            height: 2rem;
            border: none;
            border-radius: 0.3125rem;
            background: rgba(0, 0, 0, 0.4);            
            font-family: 'NanumSquareAcr';
            font-size: 1rem;
            text-indent: 0.4375rem;
            flex: 1 1 0;

            &::placeholder {
              color: #fff;
            }
          }
          `}
          placeholder='내용을 입력해주세요.'
          maxLength={150}
          onKeyDownCapture={keydownHandler}
          ref={contentRef}
        />
        <Button
          css={css`
            width: 2.125rem;
            height: 2rem;
            background: url(${sendCommentIcon});
            background-size: cover;
            margin: 0;
            filter: none;
            border-radius: 0.3125rem;
          `}
          disabled={isPending}
          onClick={submitHandler}
        />
      </form>
    </div>
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
