import icons from 'assets/survey-icon-sprites.png';
import SurveyContext from 'context/SurveyContext';
import { useContext } from 'react';
import rand from '../Result/rand';

type ImageTag = keyof typeof icon;

export default function Image() {
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
    <figure
      css={{
        width: '14.5rem',
        height: '14.5rem',
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
          width: 'calc(14.5rem * 9)',
          height: '14.5rem',
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
    left: 'calc(-1 * 14.5rem)',
  },
  DISPUTE: {
    left: 'calc(-2 * 14.5rem)',
  },
  EMOJI: {
    left: 'calc(-3 * 14.5rem)',
  },
  HEART: {
    left: 'calc(-4 * 14.5rem)',
  },
  PUBLIC: {
    left: 'calc(-5 * 14.5rem)',
  },
  SESAME: {
    left: 'calc(-6 * 14.5rem)',
  },
  FOOD: {
    left: 'calc(-7 * 14.5rem)',
  },
  HOT: {
    left: 'calc(-8 * 14.5rem)',
  },
};
