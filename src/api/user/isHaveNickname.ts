import { C_user } from 'api/core';
import { UserData } from 'api/type/user';
import { getDocs, query, where } from 'firebase/firestore';

export default async function isHaveNickname(
  nickname: string,
): Promise<UserData | undefined> {
  const q = query(C_user, where('profile.nickname', '==', nickname));
  const response = await getDocs(q);

  let data;
  response.forEach((doc) => {
    data = doc.data();
  });

  return data;
}
