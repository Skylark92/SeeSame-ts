import { useContext } from 'react';
import { color } from 'style/color';
import SurveyContext from 'context/SurveyContext';
import Field from '../Field';
import Bar from '../Bar';
import percent from 'util/percent';

export default function Total() {
  const survey = useContext(SurveyContext)?.data;
  const stats = survey?.stats;

  let aRatio, bRatio;
  if (stats) {
    aRatio = percent(stats.choiceA.total, stats.total);
    bRatio = percent(stats.choiceB.total, stats.total);
  }

  return (
    <Field>
      <Field.Title>
        <span css={{ paddingLeft: '3px', color: color.choiceA }}>{survey?.choiceA}</span>
        {' | '}
        <span css={{ paddingRight: '3px', color: color.choiceB }}>{survey?.choiceB}</span>
      </Field.Title>
      <Bar choiceA={aRatio || 0} choiceB={bRatio || 0} about='total' />
    </Field>
  );
}
