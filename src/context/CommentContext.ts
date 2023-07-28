import { Comment } from 'api/type/survey';
import { Dispatch, SetStateAction, createContext } from 'react';

export type ContextState = {
  data: Comment[];
  setData: Dispatch<SetStateAction<Comment[]>>;
  isMore: boolean;
  setIsMore: Dispatch<SetStateAction<boolean>>;
};

const CommentContext = createContext<ContextState | null>(null);

export default CommentContext;
