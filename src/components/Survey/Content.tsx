import { MouseEvent, PropsWithChildren, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import SurveyContext from 'context/SurveyContext';
import Card from 'components/Card';
import Image from './Content/Image';
import Text from './Content/Text';
import Form from './Content/Form';
import Result from './Result';
import vote from 'api/survey/vote';
import Header from 'components/Header';
import { SurveyData } from 'api/type';

interface ContentProps extends PropsWithChildren {
  survey: SurveyData;
  surveyRef: React.Ref<HTMLElement>;
}

export default function Content({ survey, surveyRef }: ContentProps) {
  const [data, setData] = useState<SurveyData | undefined>(survey);
  const [result, setResult] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const choiceHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    if (user) {
      // 로그인한 경우
      if (name === 'choiceA' || name === 'choiceB') {
        const res = await vote(survey, user, name);
        if (res.ok) {
          setData(res.payload);
        } else {
          console.log(res.message);
          if (res.message === '프로필 정보가 없습니다.') return;
        }
      }
    } else if (!user) {
      // 로그인하지 않은 경우
    }
    setResult(true);
    setUserChoice(name);
  };

  const modalHandler = () => {
    setResult(false);
  };

  if (!data) return; // survey가 존재하지 않을 경우 빈 화면 표시

  return (
    <SurveyContext.Provider value={{ data, userChoice }}>
      <Card data-sid={data._id} data-tag={data.tag} ref={surveyRef}>
        <Header>{data.title}</Header>
        <Image />
        <Text content={data.content} />
        <Form handler={choiceHandler} />
        {result && <Result handler={modalHandler} />}
      </Card>
    </SurveyContext.Provider>
  );
}
