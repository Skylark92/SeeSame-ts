import { CustomResponse, UserData } from 'api/type';
import isHaveId from './isHaveId';
import { SHA224 } from 'crypto-js';

export default async function login(id: string, password: string) {
  // 로그인 실행
  // 아이디와 비밀번호 일치 시 유저 정보를 return

  const response: CustomResponse<UserData> = {
    ok: false,
    message: null,
  };

  try {
    const res = await isHaveId(id);
    const hashed = SHA224(password).toString();

    if (!res) {
      // 아이디가 존재하지 않는 경우
      response.message = '존재하지 않는 ID입니다.';
    } else if (res.password !== hashed) {
      // 해당 아이디의 비밀번호가 일치하지 않는 경우
      response.message = '비밀번호가 틀립니다.';
    } else if (res.password === hashed) {
      // 아이디와 비밀번호가 일치할 경우 유저 정보를 응답에 포함
      const { password, ...rest } = res;
      response.ok = true;
      response.payload = rest;
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
