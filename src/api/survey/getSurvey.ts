import { db } from 'api/core';
import { doc, getDoc } from 'firebase/firestore';

export default async function getSurvey(surveyId: string) {
  // 단일 서베이 가져오기
  if (!surveyId) throw new Error('요청이 올바르지 않습니다.');

  const docRef = doc(db, 'Survey', surveyId);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    throw new Error('해당 서베이가 존재하지 않습니다.');
  }
}
