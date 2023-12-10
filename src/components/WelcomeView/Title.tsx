import { font } from 'style/font';

export default function Title() {
  return (
    <h1
      css={{
        ...font.mainTitle,
        ...font.shadow,
        letterSpacing: '-0.125rem',
      }}
    >
      See Same
    </h1>
  );
}
