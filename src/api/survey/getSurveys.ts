import { C_survey } from 'api/core';
import { SurveyData } from 'api/type';
import { getDocs, orderBy, query } from 'firebase/firestore';

export default async function getSurveys() {
  // 서베이 전체 목록 가져오기

  const surveyList: SurveyData[] = [];
  const q = query(C_survey, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    surveyList.push(doc.data() as SurveyData);
  });

  return surveyList;
}
