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
        width: 2.375rem;
        height: 2.375rem;
        top: calc(var(--card-margin) + 0.4375rem);
        left: 1.1875rem;
        z-index: 15;

        @media (min-width: 42.375rem) {
          left: calc((100% - 42.375rem) / 2 + 0.59375rem);
        }
      `}
    >
      <Button
        css={css`
          display: block;
          width: 2.375rem;
          height: 2.375rem;
          border-radius: 50%;
          outline: 0.1875rem solid rgba(0, 0, 0, 0.5);

          background-color: #d9d9d9;
          background-image: url(${profileSprites});
          background-size: 7.125rem 7.125rem;
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
  'profile-image-02': '0 -2.375rem',
  'profile-image-03': '0 -4.75rem',
  'profile-image-04': '-2.375rem 0',
  'profile-image-05': '-2.375rem -2.375rem',
  'profile-image-06': '-2.375rem -4.75rem',
  'profile-image-07': '-4.75rem 0',
  'profile-image-08': '-4.75rem -2.375rem',
  'profile-image-09': '-4.75rem -4.75rem',
};
