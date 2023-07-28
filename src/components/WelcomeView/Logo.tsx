import { useState, useEffect } from 'react';
import icons from 'assets/survey-icon-sprites.png';

export default function Logo() {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (counter > 7) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 5000);
  }, [counter]);

  return (
    <figure
      css={{
        width: '14.5rem',
        height: '14.5rem',
        overflow: 'hidden',
        position: 'relative',
        margin: '2rem auto 2rem',
        flexShrink: '0',
      }}
    >
      <img
        src={icons}
        css={{
          position: 'absolute',
          width: 'calc(14.5rem * 9)',
          height: '14.5rem',
          objectFit: 'cover',
          left: `calc(-${counter} * 14.5rem)`,
        }}
      />
    </figure>
  );
}
