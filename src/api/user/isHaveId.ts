import { C_user } from 'api/core';
import { UserData } from 'api/type';
import { getDocs, query, where } from 'firebase/firestore';

export default async function isHaveId(
  id: string,
): Promise<UserData | undefined> {
  // db에 존재하는 아이디인지 확인

  const q = query(C_user, where('userid', '==', id)); // 콜렉션에 동일한 아이디를 찾는 쿼리
  const response = await getDocs(q); // 요청 보내고 응답 받음

  let data;
  response.forEach((doc) => {
    data = doc.data();
  });

  return data; // 존재하는 경우 UserData, 없는 경우 undefined
}
