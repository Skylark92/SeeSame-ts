import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import SurveyContext from 'context/SurveyContext';
import Bar from '../Bar';
import Field from '../Field';
import percent from 'util/percent';
import BestMBTI from './MBTI/BestMBTI';

export default function MBTI() {
  const user = useSelector((state: RootState) => state.auth.user);
  const survey = useContext(SurveyContext)?.data;
  const stats = survey?.stats;

  let ratioA, ratioB;
  if (user?.profile?.MBTI && stats) {
    const total =
      stats.choiceA.MBTI[user.profile.MBTI] +
      stats.choiceB.MBTI[user.profile.MBTI];

    ratioA = percent(stats.choiceA.MBTI[user.profile.MBTI], total);
    ratioB = percent(stats.choiceB.MBTI[user.profile.MBTI], total);
  }

  if (ratioA === undefined || ratioB === undefined) return;

  return (
    <Field css={{ paddingBottom: '0.4375rem' }}>
      <Field.Title>MBTI</Field.Title>
      <div css={{ display: 'flex', gap: '0.4375rem' }}>
        <span css={{ fontSize: '0.75rem', lineHeight: '1.125rem' }}>
          {user?.profile?.MBTI}
        </span>
        <Bar choiceA={ratioA} choiceB={ratioB} />
      </div>
      <BestMBTI />
    </Field>
  );
}
