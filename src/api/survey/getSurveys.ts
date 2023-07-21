import { C_survey } from 'api/core';
import { getDocs } from 'firebase/firestore';

export default async function getSurveys(): Promise<unknown[]> {
  // 서베이 전체 목록 가져오기

  const surveyList: unknown[] = [];
  const snapshot = await getDocs(C_survey);

  snapshot.forEach((doc) => {
    surveyList.push(doc.data());
  });

  return surveyList;
}
