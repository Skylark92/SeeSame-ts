import { font } from 'style/font';

export default function Greetings() {
  return (
    <p
      css={{
        ...font.mainParagraph,
        lineHeight: '2rem',
      }}
    >
      당신과 동일한 성향의 사람은
      <br />
      얼마나 있을까요?
    </p>
  );
}
