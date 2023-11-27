import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Comment } from 'api/type/survey';
import CommentContext from 'context/CommentContext';
import SurveyContext from 'context/SurveyContext';
import getComments from 'api/survey/comment/getComments';
import Field from '../Field';
import Total from './Opinion/Total';
import Best from './Opinion/Best';
import Button from './Opinion/Button';
import Content from './Opinion/Content';
import DeleteComment from 'api/survey/comment/DeleteComment';
import Loading from 'components/Loading';

export default function Opinion() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const survey = useContext(SurveyContext)?.data;
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (survey) {
      setIsLoading(true);
      getComments(survey).then((res) => {
        setComments(res as Comment[]);
        // console.log(res); // 콘솔
        setIsLoading(false);
      });
    }
  }, []);

  const deleteHandler = async (comment: Comment) => {
    if (!(comment && survey && user)) return;
    if (user?._id !== comment.author._id) return;

    const confirm = window.confirm(
      `"${comment.content}"\n 해당 댓글을 삭제하시겠습니까?`,
    );

    if (confirm) {
      await DeleteComment(comment, survey, user);
      const target = comments.find((value) => comment._id === value._id);
      if (target) {
        const index = comments.indexOf(target);
        const temp = [...comments];
        temp.splice(index, 1);
        setComments(temp);
      } else {
        throw new Error('해당 댓글을 찾을 수 없습니다.');
      }
    } else return;
  };

  return (
    <CommentContext.Provider
      value={{ data: comments, setData: setComments, isMore, setIsMore }}
    >
      <Field css={{ position: 'relative', padding: '10px 5px 3px' }}>
        <Field.Title css={{ margin: '-1rem auto 0' }}>BEST 댓글</Field.Title>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Button onClick={() => setIsMore(true)}>댓글 더 보기</Button>
            {comments
              .filter((_, i) => i < 3)
              .map((comment, i) => {
                return (
                  <>
                    <Best data={comment} index={i} key={'best' + comment._id} />
                    {i < 2 && (
                      <hr
                        css={{
                          margin: '0.125rem 0 0.5rem 0',
                          borderColor: 'rgba(255, 255, 255, 0.25)',
                        }}
                      />
                    )}
                  </>
                );
              })}
          </React.Fragment>
        )}
      </Field>
      {isMore && (
        <Total>
          {comments.map((comment) => {
            return (
              <Content
                key={comment._id}
                data={comment}
                onClick={() => deleteHandler(comment)}
              />
            );
          })}
        </Total>
      )}
    </CommentContext.Provider>
  );
}
