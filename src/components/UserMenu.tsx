import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { LOGOUT } from 'store/authSlice';
import Button from './Button';
import profileSprites from 'assets/profile-image-sprites.png';

const slideFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-100%);
}

to {
  opacity: 1;
  transform: translateY(0%);
}
`;

const slideFadeOut = keyframes`
  0% {
    transform: traslateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

export default function UserMenu() {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth)?.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileIndex = user
    ? user.profile
      ? user.profile.profileImage
      : 'profile-image-01'
    : 'profile-image-01';

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  const logout = () => {
    dispatch(LOGOUT());
    navigate('/');
  };

  return (
    <article
      id='user-menu'
      css={css`
        position: absolute;
        width: 2.625rem;
        height: 2.625rem;
        top: calc(var(--card-margin) + 0.5rem);
        left: 0.875rem;
        z-index: 15;

        @media (min-width: 44.1875rem) {
          left: calc((100vw - 42.375rem) / 2);
        }
      `}
    >
      <Button
        css={css`
          display: block;
          width: 2.625rem;
          height: 2.625rem;
          border-radius: 50%;
          margin: 0;

          background-color: transparent;
          background-image: url(${profileSprites});
          background-size: 7.875rem 7.875rem;
          background-position: ${profile[profileIndex]};
          background-repeat: no-repeat;
        `}
        onClick={onClickHandler}
      />
      {dropdown && (
        <nav
          css={css`
            width: 100%;
            overflow: hidden;

            position: absolute;
            top: 2.375rem;

            & > ul {
              animation: ${dropdown ? slideFadeIn : slideFadeOut} 0.4s ease;
              animation-fill-mode: forwards;
            }
          `}
        >
          <ul
            css={css`
              position: relative;

              top: 0.3125rem;
              margin-top: 0;
              margin-bottom: 0.3125rem;
              padding-left: 0;
              list-style: none;

              & > li {
                width: 100%;
                font-size: 1rem;

                display: block;
                background: #fff;
                color: #000;
                border: 1px solid #000;

                cursor: pointer;
              }
            `}
          >
            <li>
              <Link to='/editprofile' onClick={onClickHandler}>
                정보 수정
              </Link>
            </li>
            <li onClick={logout}>로그 아웃</li>
          </ul>
        </nav>
      )}
    </article>
  );
}

const profile = {
  'profile-image-01': '0 0;',
  'profile-image-02': '0 -2.625rem',
  'profile-image-03': '0 -5.25rem',
  'profile-image-04': '-2.625rem 0',
  'profile-image-05': '-2.625rem -2.625rem',
  'profile-image-06': '-2.625rem -5.25rem',
  'profile-image-07': '-5.25rem 0',
  'profile-image-08': '-5.25rem -2.625rem',
  'profile-image-09': '-5.25rem -5.25rem',
};
