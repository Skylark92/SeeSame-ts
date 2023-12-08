import { DocumentReference, Timestamp } from 'firebase/firestore';

/* API response */
export interface CustomResponse<T = null> {
  ok: boolean;
  message: string | null;
  payload?: T;
}

/* Survey */
export interface SurveyData {
  _id: string;
  title: string;
  content: string;
  choiceA: string;
  choiceB: string;
  tag: SurveyTag[];
  createdAt: Date | Timestamp;
  users: {
    [key: string]: {
      choice: string;
      profile: UserProfile;
    };
  };
  stats: {
    total: number;
    choiceA: StatsField;
    choiceB: StatsField;
  };
}

export type SurveyTag = '밸런스' | '호불호' | 'VS' | '음식' | '사랑' | '커플';

type StatsField = {
  total: number;
  MBTI: StatsMBTI;
  남자: StatsGender;
  여자: StatsGender;
};

type StatsGender = {
  '10대': number;
  '20대': number;
  '30대': number;
  '40대': number;
  청춘: number;
};

type StatsMBTI = {
  ENFJ: number;
  ENFP: number;
  ENTJ: number;
  ENTP: number;
  ESFJ: number;
  ESFP: number;
  ESTJ: number;
  ESTP: number;
  INFJ: number;
  INFP: number;
  INTJ: number;
  INTP: number;
  ISFJ: number;
  ISFP: number;
  ISTJ: number;
  ISTP: number;
};

/* Comment */
export interface CommentData {
  _id: string;
  author: DocumentReference;
  content: string;
  like: number;
  users: {
    [key: string]: {
      choice: string;
      profile: UserProfile;
    };
  };
  createdAt: Date | Timestamp;
}

export interface CommentLoaded extends Omit<CommentData, 'author'> {
  author: Author;
}

/* User */
export interface UserData {
  _id: string;
  userid: string;
  password?: string;
  question: string;
  answer: string;
  profile?: UserProfile;
  admin?: boolean;
}

export type UserInput = Omit<UserData, '_id' | 'profile' | 'admin'>;

export type Author = Omit<UserData, 'question' | 'answer'>;

export type UserProfile = {
  nickname: string;
  gender: UserGender;
  age: UserAge;
  MBTI: UserMBTI;
  profileImage: ProfileImage;
};

export type UserGender = '남자' | '여자';

export type UserAge = '10대' | '20대' | '30대' | '40대' | '청춘';

export type UserMBTI =
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
