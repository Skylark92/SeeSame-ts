import { C_survey } from 'api/core';
import { SurveyResponse, Tags } from 'api/type/survey';
import { doc, setDoc } from 'firebase/firestore';

interface Parameters {
  title: string;
  content: string;
  tag: Tags;
  choiceA: string;
  choiceB: string;
}

export default async function addSurvey({
  title,
  content,
  tag = [],
  choiceA = '가능',
  choiceB = '불가능',
}: Parameters): Promise<SurveyResponse> {
  // 새로운 서베이를 추가

  const response: SurveyResponse = {
    ok: false,
    message: null,
  };

  if (!(title && content)) return response; // 제목이나 내용이 없다면 실행하지 않음

  try {
    const surveyRef = doc(C_survey); // 자동 생성된 id를 참조하기 위함

    const initialStats = {
      total: 0,
      choiceA: {
        total: 0,
        남자: { '10대': 0, '20대': 0, '30대': 0, '40대': 0, 청춘: 0 },
        여자: { '10대': 0, '20대': 0, '30대': 0, '40대': 0, 청춘: 0 },
        MBTI: {
          ESTJ: 0,
          ESTP: 0,
          ESFJ: 0,
          ESFP: 0,
          ENTJ: 0,
          ENTP: 0,
          ENFJ: 0,
          ENFP: 0,
          INFP: 0,
          INFJ: 0,
          INTP: 0,
          INTJ: 0,
          ISFP: 0,
          ISFJ: 0,
          ISTP: 0,
          ISTJ: 0,
        },
      },
      choiceB: {
        total: 0,
        남자: { '10대': 0, '20대': 0, '30대': 0, '40대': 0, 청춘: 0 },
        여자: { '10대': 0, '20대': 0, '30대': 0, '40대': 0, 청춘: 0 },
        MBTI: {
          ESTJ: 0,
          ESTP: 0,
          ESFJ: 0,
          ESFP: 0,
          ENTJ: 0,
          ENTP: 0,
          ENFJ: 0,
          ENFP: 0,
          INFP: 0,
          INFJ: 0,
          INTP: 0,
          INTJ: 0,
          ISFP: 0,
          ISFJ: 0,
          ISTP: 0,
          ISTJ: 0,
        },
      },
    };

    const surveyData = {
      title,
      content,
      choiceA,
      choiceB,
      tag,
      stats: initialStats,
      createdAt: new Date(),
      user: [],
    };

    await setDoc(surveyRef, {
      ...surveyData,
      _id: surveyRef.id, // _id를 다른 정보들과 같은 레벨에 있도록 함
    });

    response.ok = true;
    response.survey = {
      ...surveyData,
      _id: surveyRef.id,
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
