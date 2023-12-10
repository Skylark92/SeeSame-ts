import icons from 'assets/survey_sprites.png';
import SurveyContext from 'context/SurveyContext';
import { useContext } from 'react';
import rand from '../Result/rand';

type ImageTag = keyof typeof icon;

const imgWidth = '13.25rem'; // 212px;

export default function Image() {
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
    <figure
      css={{
        width: imgWidth,
        height: imgWidth,
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto',
        flexShrink: '0',
      }}
    >
      <img
        src={icons}
        css={{
          position: 'absolute',
          width: `calc(${imgWidth} * 13)`,
          height: imgWidth,
          objectFit: 'cover',
          ...icon[imgTag],
        }}
      />
    </figure>
  );
}

const icon = {
  BASIC: {
    left: 0,
  },
  COUPLE: {
    left: `calc(-1 * ${imgWidth})`,
  },
  DISPUTE: {
    left: `calc(-2 * ${imgWidth})`,
  },
  EMOJI: {
    left: `calc(-3 * ${imgWidth})`,
  },
  HEART: {
    left: `calc(-4 * ${imgWidth})`,
  },
  PUBLIC: {
    left: `calc(-5 * ${imgWidth})`,
  },
  SESAME: {
    left: `calc(-6 * ${imgWidth})`,
  },
  FOOD: {
    left: `calc(-7 * ${imgWidth})`,
  },
  HOT: {
    left: `calc(-8 * ${imgWidth})`,
  },
  COUPLE2: {
    left: `calc(-9 * ${imgWidth})`,
  },
  FOOD2: {
    left: `calc(-10 * ${imgWidth})`,
  },
  HEART2: {
    left: `calc(-11 * ${imgWidth})`,
  },
  HOT2: {
    left: `calc(-12 * ${imgWidth})`,
  },
};
