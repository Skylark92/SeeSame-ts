import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { position } from 'style/position';
import sprites from 'assets/profile-image-sprites.png';

interface Props extends PropsWithChildren {
  isModal: boolean;
}

export default function Modal({ isModal }: Props) {
  const images = [
    'profile-image-01',
    'profile-image-02',
    'profile-image-03',
    'profile-image-04',
    'profile-image-05',
    'profile-image-06',
    'profile-image-07',
    'profile-image-08',
    'profile-image-09',
  ] as const;

  return (
    <div
      css={css`
        display: ${isModal ? 'block' : 'none'};
        position: absolute;
        top: 6.5625rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;

        box-sizing: content-box;
        padding: 1.375rem;
        background: #fff;
        border-radius: 0.625rem;
        outline: 3px solid rgba(0, 0, 0, 0.4);

        &::before {
          content: '';
          position: absolute;
          border-style: solid;
          border-width: 0 3.875rem 2.625rem 0; // 62px 42px
          border-color: rgba(0, 0, 0, 0.4) transparent;
          display: block;
          width: 0;
          z-index: 0;
          top: -2.6875rem;
          right: 5.75rem;
        }

        &::after {
          content: '';
          position: absolute;
          border-style: solid;
          border-width: 0 3.625rem 2.5rem 0; // 58px 40px
          border-color: #ffffff transparent;
          display: block;
          width: 0;
          z-index: 1;
          top: -2.375rem;
          right: 5.8125rem;
        }
      `}
    >
      <fieldset
        css={css`
          width: fit-content;
          height: fit-content;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          justify-content: center;
          align-items: center;
        `}
      >
        {images.map((image) => (
          <label
            key={image}
            htmlFor={image}
            css={css`
              display: inline-block;
              background-image: url(${sprites});
              background-position: ${position[image].top}
                ${position[image].left};
              background-repeat: no-repeat;
              background-size: 19.6875rem 19.6875rem;
              width: 6.5625rem;
              height: 6.5625rem;

              cursor: pointer;
            `}
          >
            <input
              type='radio'
              id={image}
              name='profileImage'
              value={image}
              hidden
            />
          </label>
        ))}
      </fieldset>
    </div>
  );
}
