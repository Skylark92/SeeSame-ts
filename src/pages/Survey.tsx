import { css } from '@emotion/react';
import { RefObject, createRef, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { SurveyData } from 'api/type/survey';
import Content from 'components/Survey/Content';
import Slide from 'components/Survey/Slide';
import UserMenu from 'components/UserMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { CHANGE } from 'store/colorSlice';

export default function Survey() {
  const survey = useLoaderData() as SurveyData[];
  const refs = useRef<RefObject<HTMLElement>[]>([]);
  const params = useParams();
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  // 서베이 갯수만큼 ref 생성
  survey.forEach((_, i) => (refs.current[i] = createRef<HTMLElement>()));

  // 옵저버, 대상 id와 주소가 일치하지 않으면 변경시키기
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement; // dataset을 이용하기 위한 임시적인 타입 단언
          const id = target.dataset.sid;
          if (params.id !== id) {
            navigate(`/survey/${id}`, { replace: true });
          } // 주소 일치

          const majorTag = target.dataset.tag?.split(',')[0];
          if (majorTag === '사랑' || majorTag === '커플')
            dispatch(
              CHANGE({
                cardColor: '#ea6f8d',
                backgroundColor: '#ffa6bc',
              }),
            );
          else if (majorTag === 'VS' || majorTag === '음식')
            dispatch(
              CHANGE({
                cardColor: '#7e5ed9',
                backgroundColor: '#ce9cf6',
              }),
            );
          else if (majorTag === '호불호')
            dispatch(
              CHANGE({
                cardColor: '#99e150',
                backgroundColor: '#34a300',
              }),
            );
          else
            dispatch(
              CHANGE({
                cardColor: '#268fdf',
                backgroundColor: '#6bbfff',
              }),
            );
          // 색상 일치
        }
      });
    },
    { threshold: 1 },
  );

  // 컴포넌트 호출 시 각 서베이 옵저빙
  useEffect(() => {
    refs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  });

  return (
    <main
      id='survey'
      css={css`
        height: 100%;

        overflow-y: scroll;
        -webkit-scroll-snap-type: y mandatory;
        scroll-snap-type: y mandatory;

        // &::-webkit-scrollbar {
        //   display: none;
        // }
      `}
    >
      {isLogin && <UserMenu />}
      <Slide>
        {survey.map((s, i) => (
          <Content key={s._id} survey={s} surveyRef={refs.current[i]} />
        ))}
        <div
          css={{
            width: '100%',
            height: 'var(--card-margin)',
            background: 'transparent',
            scrollSnapAlign: 'none',
            scrollSnapStop: 'unset',
          }}
        ></div>
      </Slide>
    </main>
  );
}
