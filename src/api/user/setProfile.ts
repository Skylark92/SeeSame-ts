import { C_user } from 'api/core';
import { doc, updateDoc } from 'firebase/firestore';
import isHaveNickname from './isHaveNickname';
import { CustomResponse, UserProfile } from 'api/type';

export default async function setProfile(id: string, data: UserProfile) {
  // 프로필 설정

  const response: CustomResponse<UserProfile> = {
    ok: false,
    message: null,
  };

  // 데이터 양식 일람
  // 이 범위를 벗어나면 통계자료에 오류가 생길 수 있음
  const genderList = ['남자', '여자'];
  const ageList = ['10대', '20대', '30대', '40대', '청춘'];
  const MBTIList = [
    'ESTJ',
    'ESTP',
    'ESFJ',
    'ESFP',
    'ENTJ',
    'ENTP',
    'ENFJ',
    'ENFP',
    'INFP',
    'INFJ',
    'INTP',
    'INTJ',
    'ISFP',
    'ISFJ',
    'ISTP',
    'ISTJ',
  ];
  const imageList = /profile-image-0\d/g;

  // 데이터 검사
  if (!(id && data)) {
    response.message = '로그인 정보가 없거나, 변경할 프로필 정보가 없습니다.';
    return response;
  }

  const { nickname, gender, age, MBTI, profileImage } = data;

  if (nickname.length > 10) {
    response.message = '닉네임은 10자를 넘을 수 없습니다.';
    return response;
  }
  if (nickname.length < 1) {
    response.message = '닉네임을 입력해주세요.';
    return response;
  }

  if (
    !(
      genderList.includes(gender) &&
      ageList.includes(age) &&
      MBTIList.includes(MBTI) &&
      imageList.test(profileImage)
    )
  ) {
    response.message =
      '성별, 나이, MBTI 또는 이미지에 범위를 벗어난 정보가 포함돼있습니다.';
    return response;
  }

  const nicknameCheck = await isHaveNickname(nickname);
  if (nicknameCheck) {
    if (nicknameCheck._id !== id) {
      response.message = '이미 사용 중인 닉네임입니다.';
      return response;
    }
  }

  // 실행
  try {
    const userRef = doc(C_user, id);

    await updateDoc(userRef, {
      profile: data,
    });

    response.payload = data;
    response.ok = true;

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      response.message = error.message;
    }

    return response;
  }
}
