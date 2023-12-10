import { css } from '@emotion/react';
import { HTMLAttributes, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { color } from 'style/color';
import { font } from 'style/font';
import SurveyContext from 'context/SurveyContext';
import meIcon from 'assets/me-icon.png';

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  about?: string;
}

export default function Body({ ratio, about, ...props }: BodyProps) {
  const user = useSelector((state: RootState) => state.auth)?.user;
  const userChoice = useContext(SurveyContext)?.userChoice;
  let badge = false;
  let check: string[] = [];

  if (about) {
    // about이 undefined가 아닌 경우
    check = about.split(',');
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
        css={{
          fontFamily: 'NanumSquareAcr',
          display: 'flex',
          width: '100%',
          height: '100%',
          gap: '0.375rem',
          justifyContent: ratio === undefined ? 'center' : 'normal',
          alignItems: 'center',
          ...font.stroke,
        }}
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
        {badge && (
          <img
            css={{
              width: '1rem',
              height: '1rem',
              scale: '2',
              marginTop: '-0.125rem',
            }}
            src={meIcon}
          />
        )}
      </div>
    </div>
  );
}
