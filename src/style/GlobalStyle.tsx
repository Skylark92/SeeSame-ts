import { Global, css } from '@emotion/react';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        :root,
        body,
        #root,
        main {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        :root {
          font-family: 'NanumSquareAcb';
          font-size: 16px;
          text-align: center;
          color: #fff;
          background: #6bbfff;

          ${variables}
          ${mq}
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      `}
    />
  );
}

const variables = `
  --card-margin: 30px;
`;

const mq = `
@media (min-height: 768px) and (min-width: 512px) {
  --card-margin: 52px;
}

@media (max-width: 390px), (max-height: 844px) {
  font-size: 16px;
}

@media (max-width: 360px), (max-height: 816px) {
  font-size: 15px;
}

@media (max-width: 320px), (max-height: 768px) {
  font-size: 14px;
}

@media (max-width: 300px), (max-height: 720px) {
  font-size: 13px;
}

@media (max-width: 280px), (max-height: 672px) {
  font-size: 12px;
}

@media (max-width: 260px), (max-height: 624px) {
  font-size: 11px;
}

@media (max-width: 240px), (max-height: 576px) {
  font-size: 10px;
}

@media (max-width: 220px), (max-height: 528px) {
  font-size: 9px;
}

@media (max-width: 200px), (max-height: 480px) {
  font-size: 8px;
}
`;
