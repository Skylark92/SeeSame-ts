import icons from 'assets/survey-icon-sprites.png';
import SurveyContext from 'context/SurveyContext';
import { useContext } from 'react';
import { icon } from 'style/icon';

export default function Image() {
  const survey = useContext(SurveyContext)?.data;

  const tag = survey ? (survey.tag[0] ? survey.tag[0] : 'BASIC') : 'BASIC';

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
          ...icon[tag],
        }}
      />
    </figure>
  );
}
