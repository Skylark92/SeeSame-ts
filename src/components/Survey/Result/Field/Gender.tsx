import { css } from '@emotion/react';
import Field from '../Field';
import AgeBar from './Gender/AgeBar';
import manIcon from 'assets/man-icon.png';
import womanIcon from 'assets/woman-icon.png';

export default function Gender() {
  return (
    <Field
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1.1875rem 0.5rem 1rem;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 3.375rem;
          height: 1.5rem;
          background: url(${manIcon});
          background-size: 3.375rem 1.5rem;
          background-repeat: no-repeat;
          position: absolute;
          top: -0.625rem;
          left: 15%;
        }
        &::after {
          content: '';
          display: block;
          width: 3.375rem;
          height: 1.5rem;
          background: url(${womanIcon});
          background-size: 3.375rem 1.5rem;
          background-repeat: no-repeat;
          position: absolute;
          top: -0.625rem;
          right: 15%;
        }
      `}
    >
      <AgeBar age='청춘' />
      <AgeBar age='40대' />
      <AgeBar age='30대' />
      <AgeBar age='20대' />
      <AgeBar age='10대' />
      <div
        css={{
          width: '2.8125rem',
          height: '8.875rem',
          background: '#00365f',
          border: '0.125rem solid #00a8ff',
          borderRadius: '0.625rem',
          position: 'absolute',
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Field>
  );
}
