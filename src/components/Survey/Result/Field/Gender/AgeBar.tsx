import { PropsWithChildren, useContext } from 'react';
import { Age } from 'api/type/user';
import Bar from '../../Bar';
import SurveyContext from 'context/SurveyContext';
import percent from 'util/percent';

interface AgeProps extends PropsWithChildren {
  age?: Age;
}

export default function AgeBar({ age }: AgeProps) {
  const survey = useContext(SurveyContext)?.data;
  const stats = survey?.stats;
  let manA, manB, womanA, womanB;
  if (age && stats) {
    const manTotal = stats.choiceA.남자[age] + stats.choiceB.남자[age];
    const womanTotal = stats.choiceA.여자[age] + stats.choiceB.여자[age];

    manA = percent(stats.choiceA.남자[age], manTotal);
    manB = percent(stats.choiceB.남자[age], manTotal);
    womanA = percent(stats.choiceA.여자[age], womanTotal);
    womanB = percent(stats.choiceB.여자[age], womanTotal);
  }

  if (
    !(
      manA !== undefined &&
      manB !== undefined &&
      womanA !== undefined &&
      womanB !== undefined
    )
  )
    return; // 없으면 렌더링하지 않는다.

  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <Bar choiceA={manA} choiceB={manB} />
      <h5 css={{ fontSize: '0.8125rem', zIndex: '3', flex: '0 0 2.75rem' }}>
        {age}
      </h5>
      <Bar choiceA={womanA} choiceB={womanB} />
    </div>
  );
}
