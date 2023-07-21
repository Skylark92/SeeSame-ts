import { Timestamp } from 'firebase/firestore';
import { CustomResponse } from './response';
import { UserData } from './user';

export interface SurveyData {
  _id: string;
  title: string;
  content: string;
  choiceA: string;
  choiceB: string;
  tag: string[];
  createdAt: Date | Timestamp;
  user: string[];
  // comment: Comment;
  stats: {
    total: number;
    choiceA: Choice;
    choiceB: Choice;
  };
}

export interface SurveyResponse extends CustomResponse {
  survey?: SurveyData;
}

export interface CommentResponse extends CustomResponse {
  comment?: Comment;
}

export interface Comment {
  _id: string;
  author: UserData;
  content: string;
  like: number;
  user: string[];
  createdAt: Date | Timestamp;
}

type Choice = {
  total: number;
  MBTI: MBTI;
  남자: Gender;
  여자: Gender;
};

type Gender = {
  '10대': number;
  '20대': number;
  '30대': number;
  '40대': number;
  청춘: number;
};

type MBTI = {
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
