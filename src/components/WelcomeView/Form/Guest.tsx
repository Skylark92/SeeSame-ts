import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function Guest() {
  const navigate = useNavigate();

  return (
    <p
      css={css`
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
      onClick={() => navigate('/survey')}
    >
      로그인 없이 이용하기
    </p>
  );
}
