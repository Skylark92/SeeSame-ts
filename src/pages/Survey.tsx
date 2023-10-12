import { css } from '@emotion/react';
import { RefObject, createRef, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { SurveyData } from 'api/type/survey';
import Content from 'components/Survey/Content';
import Slide from 'components/Survey/Slide';
import UserMenu from 'components/UserMenu';

export default function Survey() {
  const survey = useLoaderData() as SurveyData[];
  const refs = useRef<RefObject<HTMLElement>[]>([]);
  const params = useParams();
  const navigate = useNavigate();

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
          }
          //
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
      <UserMenu />
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
