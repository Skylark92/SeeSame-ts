import { db } from 'api/core';
import { CustomResponse, UserData } from 'api/type';
import { doc, getDoc, increment, runTransaction } from 'firebase/firestore';

export default async function likeComment(
  surveyId: string,
  commentId: string,
  user: UserData,
) {
  const response: CustomResponse<Comment> = {
    ok: false,
    message: null,
  };

  if (!(user && user.profile)) {
    response.message = '유저 정보가 없습니다.';
    return response;
  }

  const commentRef = doc(db, `Survey/${surveyId}/Comment/${commentId}`);

  try {
    await runTransaction(db, async (transaction) => {
      const commentDoc = await transaction.get(commentRef);
      if (!commentDoc.exists()) {
        throw new Error('해당 댓글이 존재하지 않습니다.');
      }

      const data = commentDoc.data();
      if (data.users?.[user._id]) {
        throw new Error('이미 좋아요 표시를 했습니다.');
      }

      transaction.update(commentRef, {
        like: increment(1),
        ['users' + `.${user._id}`]: true,
      });
    });

    const latestComment = await getDoc(commentRef);
    response.ok = true;
    if (latestComment.exists()) {
      response.payload = latestComment.data() as Comment;
    } else {
      throw new Error('최신 정보를 불러오는데 실패했습니다.');
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }
  }
  return response;
}
