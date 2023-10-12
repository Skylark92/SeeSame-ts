import { useContext } from 'react';
import SurveyContext from 'context/SurveyContext';
import chooseBestMBTI from './chooseBestMBTI';
import percent from 'util/percent';

export default function BestMBTI() {
  const survey = useContext(SurveyContext)?.data;
  const stats = survey?.stats;

  let bestMBTI;
  if (survey) bestMBTI = chooseBestMBTI(survey);
  if (!bestMBTI) return;
  const [bestA, bestB] = bestMBTI;

  let ratioA, ratioB;
  if (stats) {
    const totalA = stats.choiceA.MBTI[bestA] + stats.choiceB.MBTI[bestA];

    const totalB = stats.choiceA.MBTI[bestB] + stats.choiceB.MBTI[bestB];

    ratioA = percent(stats.choiceA.MBTI[bestA], totalA);
    ratioB = percent(stats.choiceB.MBTI[bestB], totalB);
  }

  if (ratioA === undefined || ratioB === undefined) return;

  return (
    <p
      css={{
        width: '100%',
        textAlign: 'right',
        fontSize: '12px',
        marginTop: '0.4375rem',
      }}
    >
      <span>
        {bestA}: <span css={{ color: '#80ff00' }}>최다 A - {ratioA}%</span>
      </span>
      <span css={{ paddingLeft: '1.1875rem' }}>
        {bestB}: <span css={{ color: '#e47bff' }}>최다 B - {ratioB}%</span>
      </span>
    </p>
  );
}
