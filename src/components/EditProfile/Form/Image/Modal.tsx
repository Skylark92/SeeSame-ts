import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
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
          border-width: 0 1.975rem 1.6875rem 0; // 31.6px 27px
          border-color: rgba(0, 0, 0, 0.4) transparent;
          display: block;
          width: 0;
          z-index: 0;
          top: -1.6875rem;
          right: 5.6875rem;
        }

        &::after {
          content: '';
          position: absolute;
          border-style: solid;
          border-width: 0 1.725rem 1.4375rem 0; // 27.6px 23px
          border-color: #ffffff transparent;
          display: block;
          width: 0;
          z-index: 1;
          top: -1.375rem;
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
          column-gap: 0.9375rem;
          row-gap: 0.25rem;
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
              background-size: 14.25rem 14.25rem;
              width: 4.75rem;
              height: 4.75rem;

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

export const position = {
  'profile-image-01': {
    top: 0,
    left: 0,
  },
  'profile-image-02': {
    top: 0,
    left: '-4.75rem',
  },
  'profile-image-03': {
    top: 0,
    left: '-9.5rem',
  },
  'profile-image-04': {
    top: '-4.75rem',
    left: 0,
  },
  'profile-image-05': {
    top: '-4.75rem',
    left: '-4.75rem',
  },
  'profile-image-06': {
    top: '-4.75rem',
    left: '-9.5rem',
  },
  'profile-image-07': {
    top: '-9.5rem',
    left: 0,
  },
  'profile-image-08': {
    top: '-9.5rem',
    left: '-4.75rem',
  },
  'profile-image-09': {
    top: '-9.5rem',
    left: '-9.5rem',
  },
};
