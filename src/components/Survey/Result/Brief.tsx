import { useContext } from 'react';
import SurveyContext from 'context/SurveyContext';
import icons from 'assets/survey_sprites.png';
import rand from './rand';
import Share from './Share';

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
    } else if (majorTag === 'VS') {
      rand(survey._id) ? (imgTag = 'HOT') : (imgTag = 'HOT2');
    } else if (majorTag === '음식') {
      rand(survey._id) ? (imgTag = 'FOOD') : (imgTag = 'FOOD2');
    } else if (majorTag === '사랑') {
      rand(survey._id) ? (imgTag = 'HEART') : (imgTag = 'HEART2');
    } else if (majorTag === '커플') {
      rand(survey._id) ? (imgTag = 'COUPLE') : (imgTag = 'COUPLE2');
    }
  }

  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.625rem',
        position: 'relative',
      }}
    >
      <div
        css={{
          width: imgWidth,
          height: imgWidth,
          backgroundImage: `url(${icons})`,
          backgroundSize: `calc(${imgWidth} * 13) 4.625rem`,
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
      <Share />
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
  COUPLE2: {
    backgroundPosition: `calc(-9 * ${imgWidth}) 0`,
  },
  FOOD2: {
    backgroundPosition: `calc(-10 * ${imgWidth}) 0`,
  },
  HEART2: {
    backgroundPosition: `calc(-11 * ${imgWidth}) 0`,
  },
  HOT2: {
    backgroundPosition: `calc(-12 * ${imgWidth}) 0`,
  },
};
