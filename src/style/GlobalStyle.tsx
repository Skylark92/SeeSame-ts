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

        body {
          transition: background 1.5s;
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

@media (max-width: 390px) {
  font-size: 16px;
}

@media (max-width: 360px) {
  font-size: 15px;
}

@media (max-width: 320px) {
  font-size: 14px;
}

@media (max-width: 300px) {
  font-size: 13px;
}

@media (max-width: 280px) {
  font-size: 12px;
}

@media (max-width: 260px) {
  font-size: 11px;
}

@media (max-width: 240px) {
  font-size: 10px;
}

@media (max-width: 220px) {
  font-size: 9px;
}

@media (max-width: 200px) {
  font-size: 8px;
}
`;
