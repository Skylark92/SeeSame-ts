import { db } from 'api/core';
import { SurveyData } from 'api/type/survey';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default async function getComments(
  survey: SurveyData,
): Promise<unknown[]> {
  // 서베이 전체 목록 가져오기

  const commentList: unknown[] = [];
  const q = query(
    collection(db, 'Survey', survey._id, 'Comment'),
    orderBy('like', 'desc'),
  );
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    commentList.push(doc.data());
  });

  return commentList;
}
