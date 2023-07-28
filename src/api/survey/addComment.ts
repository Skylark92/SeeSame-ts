import { collection, doc, setDoc } from 'firebase/firestore';
import { CommentResponse, SurveyData } from 'api/type/survey';
import { UserData } from 'api/type/user';
import { db } from 'api/core';

export default async function addComment(
  content: string,
  survey: SurveyData,
  user: UserData,
): Promise<CommentResponse> {
  // 댓글 게시

  const response: CommentResponse = {
    ok: false,
    message: null,
  };

  const commentRef = doc(collection(db, 'Survey', survey._id, 'Comment'));

  try {
    const newComment = {
      _id: commentRef.id,
      author: {
        ...user,
      },
      content,
      like: 0,
      user: [],
      createdAt: new Date(),
    };

    await setDoc(commentRef, newComment);

    response.ok = true;
    response.comment = newComment;

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }

    return response;
  }
}
