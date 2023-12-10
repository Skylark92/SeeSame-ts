import { css } from '@emotion/react';
import { HTMLAttributes, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { color } from 'style/color';
import SurveyContext from 'context/SurveyContext';
import badgeSprites from 'assets/badge-sprites.png';

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  about?: string;
}

export default function Body({ ratio, about, ...props }: BodyProps) {
  const user = useSelector((state: RootState) => state.auth)?.user;
  const userChoice = useContext(SurveyContext)?.userChoice;
  let badge = false;

  if (about) {
    // about이 undefined가 아닌 경우
    const check = about.split(',');
    if (userChoice === check[check.length - 1]) {
      // userChoice와 대상 Bar의 Choice가 같은 경우에만
      if (check[0] === 'total') {
        // total Bar의 경우 Choice만 확인하면 됨
        if (check[1] === userChoice) badge = true;
      } else if (check[0] === 'MBTI') {
        // MBTI Bar의 경우 Choice만 확인하면 됨
        if (check[1] === userChoice) badge = true;
      } else if (check[0] === '남자' || check[0] === '여자') {
        // Gender Bar의 경우 Age까지 확인해야 함
        if (check[0] === user?.profile?.gender) {
          if (check[1] === user?.profile.age) badge = true;
        }
      }
    }
  }

  return (
    <div
      css={css`
        width: 100%;
        text-align: 'start';
        background: ${ratio === undefined ? 'gray' : color.choiceA};
        text-indent: 0.1875rem;

        flex: 1 1 ${ratio === undefined ? 100 : ratio < 10 ? 10 : ratio}%;

        &:nth-child(2) {
          background: #c852ff;
          direction: rtl;
        }
      `}
      {...props}
    >
      <div
        css={css`
          font-family: 'NanumSquareAcr';
          display: flex;
          width: 100%;
          height: 100%;
          gap: 0.5rem;
          justify-content: ${ratio === undefined ? 'center' : 'normal'};
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-stroke: 4px transparent;

          ${badge &&
          `
            &::after {
              content: '';
              display: block;
              width: 1rem;
              height: 1rem;
              scale: 2;
              background: url(${badgeSprites});
              background-size: 3.625rem 1.125rem;
              background-position: -0.125rem -0.0625rem;
              background-repeat: no-repeat;
          `}
        `}
      >
        <span
          css={{
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
            padding: '0 0.125rem',
            marginBottom: '-0.125rem',
          }}
        >
          {ratio === 0 ? '0%' : ratio ? ratio + '%' : '-'}
        </span>
      </div>
    </div>
  );
}
