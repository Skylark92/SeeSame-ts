import { useContext } from 'react';
import SurveyContext from 'context/SurveyContext';
import icons from 'assets/survey-icon-sprites.png';
import rand from './rand';

type ImageTag = keyof typeof resultIcon;

const imgWidth = '4.625rem';

export default function Brief() {
  const survey = useContext(SurveyContext)?.data;

  let imgTag: ImageTag = 'BASIC';

  if (survey) {
    const majorTag = survey.tag[0];
    if (majorTag === '밸런스') {
      rand(survey._id) ? (imgTag = 'BASIC') : (imgTag = 'DISPUTE');
    } else if (majorTag === '호불호') {
      rand(survey._id) ? (imgTag = 'EMOJI') : (imgTag = 'PUBLIC');
    } else if (majorTag === 'VS') imgTag = 'HOT';
    else if (majorTag === '음식') imgTag = 'FOOD';
    else if (majorTag === '사랑') imgTag = 'HEART';
    else if (majorTag === '커플') imgTag = 'COUPLE';
  }

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
          width: imgWidth,
          height: imgWidth,
          backgroundImage: `url(${icons})`,
          backgroundSize: '41.625rem 4.625rem',
          backgroundRepeat: 'no-repeat',
          flexShrink: 0,
          ...resultIcon[imgTag],
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

const resultIcon = {
  BASIC: {
    backgroundPosition: 0,
  },
  COUPLE: {
    backgroundPosition: `calc(-1 * ${imgWidth}) 0`,
  },
  DISPUTE: {
    backgroundPosition: `calc(-2 * ${imgWidth}) 0`,
  },
  EMOJI: {
    backgroundPosition: `calc(-3 * ${imgWidth}) 0`,
  },
  HEART: {
    backgroundPosition: `calc(-4 * ${imgWidth}) 0`,
  },
  PUBLIC: {
    backgroundPosition: `calc(-5 * ${imgWidth}) 0`,
  },
  SESAME: {
    backgroundPosition: `calc(-6 * ${imgWidth}) 0`,
  },
  FOOD: {
    backgroundPosition: `calc(-7 * ${imgWidth}) 0`,
  },
  HOT: {
    backgroundPosition: `calc(-8 * ${imgWidth}) 0`,
  },
};
