import { SurveyData } from 'api/type/survey';

export default function chooseBestMBTI(survey: SurveyData) {
  const minimumTotal = 1;
  if (survey.stats.total < minimumTotal) return;

  const choiceA = survey.stats.choiceA.MBTI;
  const choiceB = survey.stats.choiceB.MBTI;
  const result: [keyof typeof choiceA, number][] = [];

  let key: keyof typeof choiceA;
  for (key in choiceA) {
    result.push([key, choiceA[key] - choiceB[key]]);
  }

  result.sort((a, b) => b[1] - a[1]);

  return [result[0][0], result[result.length - 1][0]];
}
