import { useState } from 'react';
import { UserData } from 'api/type';
import addComment from 'api/survey/comment/addComment';

function useComment() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(' ');

  const sendComment = async (content: string, surveyId: string, user: UserData) => {
    if (!content) {
      setError('내용을 입력해주세요.');
      return;
    }
    if (!(surveyId && user)) {
      setError('잘못된 방법입니다.');
      return;
    }

    setIsPending(true); // 통신 시작

    const response = await addComment(content, surveyId, user); // 요청

    if (response.ok) {
      setError(' '); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
      return response.payload;
    } else {
      if (typeof response.message === 'string') setError(response.message);
      setIsPending(false); // 통신 종료
    }
  };

  return { sendComment, isPending, error };
}

export default useComment;
