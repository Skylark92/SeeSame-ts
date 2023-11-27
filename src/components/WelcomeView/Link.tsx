import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkModels {
  href: string;
  text: string;
}

export default function Link() {
  const Links: LinkModels[] = [
    {
      href: '/signup',
      text: '계정 만들기',
    },
    {
      href: '/survey',
      text: '로그인 없이 이용하기',
    },
  ];

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 1.625rem;
        line-height: 1.625rem;
        gap: 10px;
        justify-content: center;
        margin-top: 1rem;
      `}
    >
      {Links.map((model, i) => {
        return (
          <Linker key={i} href={model.href}>
            {model.text}
          </Linker>
        );
      })}
    </div>
  );
}

interface LinkerProps extends HTMLAttributes<HTMLParagraphElement> {
  href: string;
}

function Linker({ children, href, ...props }: LinkerProps) {
  const navigate = useNavigate();

  return (
    <p
      css={css`
        font-family: NanumSquareAcb;
        font-size: 0.875rem;
        width: 10.25rem;
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
      onClick={() => navigate(href)}
      {...props}
    >
      {children}
    </p>
  );
}
