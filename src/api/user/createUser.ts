import { C_user } from 'api/core';
import { SHA224 } from 'crypto-js';
import { doc, setDoc } from 'firebase/firestore';
import isHaveId from './isHaveId';
import { CustomResponse, UserData, UserInput } from 'api/type';

export default async function createUser(data: UserInput) {
  // 새로운 유저 등록

  const response: CustomResponse<UserData> = {
    ok: false,
    message: null,
  };

  // 데이터 검사
  if (!data) {
    // 인자가 undefined나 null일 경우 중지
    response.message = '입력된 유저 정보가 없습니다.';
    return response;
  }

  const { userid, password, question, answer } = data;

  if (!(userid && password && question && answer)) {
    // 각각의 요소들이 빈 칸이거나 undefined, null일 경우 중지
    response.message = '빈 칸이거나, 잘못된 입력값이 있습니다.';
    return response;
  }

  const polyCheck = await isHaveId(userid);

  if (polyCheck) {
    response.message = '이미 존재하는 아이디입니다.';
    return response;
  }

  // 실행
  try {
    const userRef = doc(C_user); // 자동 생성된 id를 참조하기 위함
    const hashed = SHA224(password).toString();

    await setDoc(userRef, {
      ...data,
      password: hashed,
      survey: [],
      comment: [],
      _id: userRef.id, // 문서 id를 유저 정보와 같은 레벨에 있도록 함
    });

    response.ok = true;
    response.payload = {
      userid,
      question,
      answer,
      _id: userRef.id,
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
