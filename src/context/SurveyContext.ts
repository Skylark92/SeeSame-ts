import { SurveyData } from 'api/type';
import { createContext } from 'react';

export type ContextState = {
  data: SurveyData;
  userChoice: string | null;
};

const SurveyContext = createContext<ContextState | null>(null);

export default SurveyContext;
