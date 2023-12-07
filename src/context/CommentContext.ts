import { CommentLoaded } from 'api/type';
import { Dispatch, SetStateAction, createContext } from 'react';

export type ContextState = {
  data: CommentLoaded[];
  setData: Dispatch<SetStateAction<CommentLoaded[]>>;
  isMore: boolean;
  setIsMore: Dispatch<SetStateAction<boolean>>;
};

const CommentContext = createContext<ContextState | null>(null);

export default CommentContext;
