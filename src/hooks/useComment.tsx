import { useState } from 'react';
import { SurveyData } from 'api/type/survey';
import { UserData } from 'api/type/user';
import addComment from 'api/survey/comment/addComment';

function useComment() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendComment = async (
    content: string,
    survey: SurveyData,
    user: UserData,
  ) => {
    if (!content) {
      setError('내용을 입력해주세요.');
      return;
    }
    if (!(survey && user)) {
      setError('잘못된 방법입니다.');
      return;
    }

    setIsPending(true); // 통신 시작

    const response = await addComment(content, survey, user); // 요청

    if (response.ok) {
      setError(null); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
      return response.comment;
    } else {
      if (typeof response.message === 'string') setError(response.message);
      setIsPending(false); // 통신 종료
    }
  };

  return { sendComment, isPending, error };
}

export default useComment;
