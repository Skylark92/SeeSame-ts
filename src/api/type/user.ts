import { CustomResponse } from './response';

export interface User {
  userid: string;
  password?: string;
  question: string;
  answer: string;
  profile?: Profile;
}

export interface UserData extends User {
  _id: string;
}

export type Profile = {
  nickname: string;
  gender: '남자' | '여자';
  age: '10대' | '20대' | '30대' | '40대' | '청춘';
  MBTI:
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
  profileImage: string;
};

export interface UserResponse extends CustomResponse {
  user?: UserData;
}

export interface ProfileResponse extends CustomResponse {
  profile?: Profile;
}
