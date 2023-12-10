import { useState, useEffect } from 'react';
import sprites from 'assets/loading-sprites.png';

export default function Loading() {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (counter > 10) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 75);
  }, [counter]);

  return (
    <div
      css={{
        width: '4.25rem',
        height: '4.25rem',
        overflow: 'hidden',
        margin: '1.75rem auto',
        position: 'relative',
        flexShrink: '0',
      }}
    >
      <img
        css={{
          position: 'absolute',
          width: 'calc(4.25rem * 12)',
          height: '4.25rem',
          left: `calc(-${counter} * 4.25rem)`,
        }}
        src={sprites}
      />
    </div>
  );
}
