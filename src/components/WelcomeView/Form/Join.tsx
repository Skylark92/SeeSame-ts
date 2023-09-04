import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const navigate = useNavigate();

  return (
    <p
      css={css`
        font-family: 'NanumSquareAcr';
        font-size: '0.875rem';
        width: fit-content;
        margin: 0 auto;
        margin-top: 1rem;
        text-decoration: underline;
        cursor: pointer;

        @supports (text-underline-offset: 4px;) {
          text-underline-offset: 4px;
        }
        
        @supports not (text-underline-offset: 4px;) {
          text-underline-position: under;
        }
      }
      `}
      onClick={() => navigate('/signup')}
    >
      계정 만들기
    </p>
  );
}
