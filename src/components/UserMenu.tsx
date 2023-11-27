import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { LOGOUT } from 'store/authSlice';
import Button from './Button';
import profileSprites from 'assets/profile-image-sprites.png';
import editProfileIcon from 'assets/edit-profile-icon.svg';
import logoutIcon from 'assets/logout-icon.svg';
import seriesIcon from 'assets/3eries-icon.svg';

const slideFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-25%);
}

to {
  opacity: 1;
  transform: translateY(0);
}
`;

const slideFadeOut = keyframes`
  0% {
    transform: traslateY(0);
  }
  100% {
    transform: translateY(-25%);
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
    if (!user) return;
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
        z-index: 100;

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
            width: 124px;
            padding: 3px;
            border-radius: 10px;
            outline: 3px solid rgba(0, 0, 0, 0.4);
            background: #fff;

            position: absolute;
            top: 4.125rem;
            left: 0.5625rem;

            animation: ${dropdown ? slideFadeIn : slideFadeOut} 0.4s ease;
            animation-fill-mode: forwards;

            &::before {
              content: '';
              position: absolute;
              border-style: solid;
              border-width: 0 0.625rem 1.25rem 0.625rem;
              border-color: rgba(0, 0, 0, 0.4) transparent;
              display: block;
              width: 0;
              z-index: 0;
              top: -1.3125rem;
              right: 5.6875rem;
            }
    
            &::after {
              content: '';
              position: absolute;
              border-style: solid;
              border-width: 0 0.5rem 0.875rem 0.5rem;
              border-color: #fff transparent;
              display: block;
              width: 0;
              z-index: 10001;
              top: -0.8125rem;
              right: 5.8125rem;
          `}
        >
          <ul
            css={css`
              padding: 12px 0;
              list-style: none;

              & > li {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 13px;
                gap: 6px;

                font-size: 1rem;

                background: #fff;
                color: #000;

                cursor: pointer;
              }

              & > li:nth-child(1) {
                margin-top: 0;
              }

              & > li > a {
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;
                gap: 6px;
              }
            `}
          >
            <li>
              <Link to='/editprofile' onClick={onClickHandler}>
                <img css={{ width: '25px' }} src={editProfileIcon} />
                정보 수정
              </Link>
            </li>
            {user?.admin && (
              <li>
                <Link to='/add'>
                  <img css={{ width: '25px' }} src={seriesIcon} />
                  설문 등록
                </Link>
              </li>
            )}
            <li onClick={logout}>
              <img css={{ width: '25px' }} src={logoutIcon} />
              로그 아웃
            </li>
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
