import { CustomResponse } from './response';

export interface User {
  userid: string;
  password?: string;
  question: string;
  answer: string;
  profile?: Profile;
  admin?: boolean;
}

export interface UserData extends User {
  _id: string;
}

export type Profile = {
  nickname: string;
  gender: Gender;
  age: Age;
  MBTI: MBTI;
  profileImage: ProfileImage;
};

export type Gender = '남자' | '여자';

export type Age = '10대' | '20대' | '30대' | '40대' | '청춘';

export type MBTI =
  | 'ESTJ'
  | 'ESTP'
  | 'ESFJ'
  | 'ESFP'
  | 'ENTJ'
  | 'ENTP'
  | 'ENFJ'
  | 'ENFP'
  | 'INFP'
  | 'INFJ'
  | 'INTP'
  | 'INTJ'
  | 'ISFP'
  | 'ISFJ'
  | 'ISTP'
  | 'ISTJ';

export type ProfileImage =
  | 'profile-image-01'
  | 'profile-image-02'
  | 'profile-image-03'
  | 'profile-image-04'
  | 'profile-image-05'
  | 'profile-image-06'
  | 'profile-image-07'
  | 'profile-image-08'
  | 'profile-image-09';

export interface UserResponse extends CustomResponse {
  user?: UserData;
}

export interface ProfileResponse extends CustomResponse {
  profile?: Profile;
}
