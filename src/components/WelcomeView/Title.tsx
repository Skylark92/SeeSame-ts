import Button from 'components/Button';
import Card from 'components/Card';
import { MouseEvent, useState } from 'react';
import { font } from 'style/font';
import credit from 'assets/credit.png';

export default function Title() {
  const [isCredit, setIsCredit] = useState(false);

  const handler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log(event.target);
    setIsCredit(!isCredit);
  };

  function Credit() {
    return (
      <div
        css={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1,
        }}
      >
        <Card
          css={{
            background: 'transparent',
          }}
          onClick={handler}
        >
          <Button variant='close' />
          <img width='318px' height='356px' src={credit} alt='만든 이 소개' />
        </Card>
      </div>
    );
  }

  return (
    <h1
      css={{
        ...font.mainTitle,
        ...font.shadow,
        letterSpacing: '-0.125rem',
      }}
      onClick={handler}
    >
      {isCredit && <Credit />}
      See Same
    </h1>
  );
}
