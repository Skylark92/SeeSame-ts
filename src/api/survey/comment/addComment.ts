import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from 'api/core';
import { CommentLoaded, CustomResponse, SurveyData, UserData } from 'api/type';

export default async function addComment(content: string, survey: SurveyData, user: UserData) {
  // 댓글 게시

  const response: CustomResponse<CommentLoaded> = {
    ok: false,
    message: null,
  };

  const commentRef = doc(collection(db, 'Survey', survey._id, 'Comment'));

  try {
    const newComment = {
      _id: commentRef.id,
      author: doc(db, 'User', user._id),
      content,
      like: 0,
      users: {},
      createdAt: new Date(),
    };

    await setDoc(commentRef, newComment);

    response.ok = true;
    response.payload = {
      ...newComment,
      author: {
        ...user,
      },
    };

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }

    return response;
  }
}
