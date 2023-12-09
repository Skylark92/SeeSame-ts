import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
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
import { CommentLoaded } from 'api/type';

export default function Opinion() {
  const [comments, setComments] = useState<CommentLoaded[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const survey = useContext(SurveyContext)?.data;
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (survey) {
      setIsLoading(true);
      getComments(survey._id).then((res) => {
        if (res.payload) {
          setComments(res.payload as CommentLoaded[]);
        }
        setIsLoading(false);
      });
    }
  }, []);

  const deleteHandler = async (comment: CommentLoaded) => {
    if (!(comment && survey && user)) return;
    if (user?._id !== comment.author._id) return;

    const confirm = window.confirm(`"${comment.content}"\n 해당 댓글을 삭제하시겠습니까?`);

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
    <CommentContext.Provider value={{ data: comments, setData: setComments, isMore, setIsMore }}>
      <Field css={{ position: 'relative', padding: '10px 5px 3px' }}>
        <Button onClick={() => setIsMore(true)}>{comments.length < 1 ? '댓글 작성하기' : '댓글 더 보기'}</Button>
        <Field.Title css={{ margin: '-1rem auto 0' }}>BEST 댓글</Field.Title>
        {isLoading ? (
          <Loading />
        ) : comments.length < 1 ? (
          <p
            css={{
              width: '100%',
              height: '4.25rem',
              lineHeight: '4.25rem',
              fontSize: '0.75rem',
            }}
          >
            아직 작성된 댓글이 없습니다.
          </p>
        ) : (
          <React.Fragment>
            {[...comments]
              .sort((a, b) => b.like - a.like)
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
            return <Content key={comment._id} data={comment} onClick={() => deleteHandler(comment)} />;
          })}
        </Total>
      )}
    </CommentContext.Provider>
  );
}
