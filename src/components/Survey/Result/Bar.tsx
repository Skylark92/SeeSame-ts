import { PropsWithChildren } from 'react';
import Frame from './Bar/Frame';
import Body from './Bar/Body';

interface BarProps extends PropsWithChildren {
  choiceA: number;
  choiceB: number;
}

export default function Bar({ choiceA, choiceB }: BarProps) {
  if (choiceA === 0 && choiceB === 0) {
    // 아직 결과가 없는 경우
    return (
      <Frame>
        <Body />
      </Frame>
    );
  }

  // 결과 표시
  return (
    <Frame>
      <Body ratio={choiceA}></Body>
      <Body ratio={choiceB}></Body>
    </Frame>
  );
}
