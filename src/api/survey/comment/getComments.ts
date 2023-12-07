import { db } from 'api/core';
import { CommentData, CommentLoaded, CustomResponse } from 'api/type';
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

export default async function getComments(surveyId: string) {
  // 댓글 전체 가져오기

  const response: CustomResponse<CommentLoaded[]> = {
    ok: false,
    message: null,
  };

  try {
    const commentList: CommentLoaded[] = [];
    const q = query(
      collection(db, 'Survey', surveyId, 'Comment'),
      orderBy('like', 'desc'),
      orderBy('createdAt', 'desc'),
    );
    const snapshot = await getDocs(q);

    for await (const doc of snapshot.docs) {
      const data = doc.data() as CommentData;

      if (data.author) {
        if (!(data.author instanceof DocumentReference)) {
          // author가 참조형이 아닐 경우 통과
          continue;
        }
        // 참조할 게 있으면
        const docSnap = await getDoc(data.author);

        if (docSnap?.exists()) {
          const user = docSnap.data();

          commentList.push({
            ...data,
            author: {
              _id: user._id,
              userid: user.userid,
              profile: user.profile,
            },
          });
        } else
          console.log(
            `유저 정보를 불러오는 데 실패했습니다. (Comment ID : ${doc.id})`,
          );
      }
    }

    response.ok = true;
    response.payload = commentList;
    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }
    return response;
  }
}
