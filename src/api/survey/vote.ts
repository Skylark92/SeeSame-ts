/* eslint-disable indent */
import { db } from 'api/core';
import { CustomResponse, SurveyData, UserData } from 'api/type';
import { doc, getDoc, increment, runTransaction } from 'firebase/firestore';

export default async function vote(
  survey: SurveyData,
  user: UserData,
  choice: 'choiceA' | 'choiceB',
) {
  // 사용자의 투표결과 반영

  const response: CustomResponse<SurveyData> = {
    ok: false,
    message: null,
  };

  // 예외 처리
  if (!(survey && user && choice)) {
    response.message = '통신에 필요한 정보가 누락됐습니다.';
    return response;
  }

  if (!user.profile) {
    response.message = '프로필 정보가 없습니다.';
    alert('투표를 위해 프로필 정보를 완성해주세요.');
    window.location.assign('/editprofile');
    return response;
  }

  // 실행
  try {
    const profile = user.profile;
    const surveyRef = doc(db, 'Survey', survey._id); // 서베이 문서
    // const userSurveyRef = doc(db, 'User', user._id, 'Survey', survey._id); // 유저 문서 내 서베이 문서
    const opposite =
      choice === 'choiceA'
        ? 'choiceB'
        : choice === 'choiceB'
        ? 'choiceA'
        : null;

    await runTransaction(db, async (transaction) => {
      const surveyDoc = await transaction.get(surveyRef);
      if (!surveyDoc.exists()) {
        throw new Error('해당 서베이가 존재하지 않습니다.');
      }

      const data = surveyDoc.data();
      if (data.users?.[user._id] === choice) {
        throw new Error('같은 답변에 투표할 수 없습니다.');
      }

      if (data.users?.[user._id] === opposite) {
        const votedProfile = data.users?.[user._id].profile;

        transaction.update(surveyRef, {
          ['stats.total']: increment(-1),
          ['stats' + `.${opposite}` + '.total']: increment(-1),
          ['stats' + `.${opposite}` + '.MBTI' + `.${votedProfile.MBTI}`]:
            increment(-1),
          ['stats' +
          `.${opposite}` +
          `.${votedProfile.gender}` +
          `.${votedProfile.age}`]: increment(-1),
        });
      }

      transaction.update(surveyRef, {
        ['stats.total']: increment(1),
        ['stats' + `.${choice}` + '.total']: increment(1),
        ['stats' + `.${choice}` + '.MBTI' + `.${profile.MBTI}`]: increment(1),
        ['stats' + `.${choice}` + `.${profile.gender}` + `.${profile.age}`]:
          increment(1),
        ['users' + `.${user._id}`]: {
          choice: choice,
          profile: profile,
        },
      });
    });

    const latestSurvey = await getDoc(surveyRef);

    response.ok = true;
    if (latestSurvey.exists()) {
      response.payload = latestSurvey.data() as SurveyData;
    } else {
      throw new Error('최신 정보를 불러오는데 실패했습니다.');
    }

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }

    return response;
  }
}
