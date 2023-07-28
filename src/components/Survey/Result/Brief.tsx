import { useContext } from 'react';
import { resultIcon } from 'style/icon';
import SurveyContext from 'context/SurveyContext';
import icons from 'assets/survey-icon-sprites.png';

export default function Brief() {
  const survey = useContext(SurveyContext)?.data;

  const tag = survey ? (survey.tag[0] ? survey.tag[0] : 'BASIC') : 'BASIC';

  return (
    <div
      css={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.625rem',
      }}
    >
      <div
        css={{
          width: '6.875rem',
          height: '6.875rem',
          backgroundImage: `url(${icons})`,
          backgroundSize: '61.875rem 6.875rem',
          backgroundRepeat: 'no-repeat',
          flexShrink: 0,
          ...resultIcon[tag],
        }}
      ></div>
      <p
        css={{
          fontFamily: 'NanumSquareAcr',
          fontSize: '0.75rem',
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {survey?.content}
      </p>
    </div>
  );
}
