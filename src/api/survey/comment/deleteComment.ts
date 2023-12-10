import { db } from 'api/core';
import { CommentLoaded, CustomResponse, SurveyData, UserData } from 'api/type';
import { deleteDoc, doc } from 'firebase/firestore';

export default async function deleteComment(comment: CommentLoaded, survey: SurveyData, user: UserData) {
  const response: CustomResponse = {
    ok: false,
    message: null,
  };

  const commentRef = doc(db, 'Survey', survey._id, 'Comment', comment._id);

  if (comment.author._id !== user._id) {
    response.message = '자신이 작성한 댓글만 지울 수 있습니다.';
    return response;
  }

  try {
    await deleteDoc(commentRef);

    response.ok = true;
    response.message = '댓글을 삭제했습니다.';

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }

    return response;
  }
}
