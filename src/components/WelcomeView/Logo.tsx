import { useState, useEffect } from 'react';
import icons from 'assets/survey_sprites.png';

export default function Logo() {
  const [counter, setCounter] = useState<number>(6);

  useEffect(() => {
    setTimeout(() => {
      if (counter > 11) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 5000);
  }, [counter]);

  const imgWidth = '13.25rem'; // 212px

  return (
    <figure
      css={{
        width: imgWidth,
        height: imgWidth,
        overflow: 'hidden',
        position: 'relative',
        margin: '6px auto',
        flexShrink: '0',
      }}
    >
      <img
        src={icons}
        css={{
          position: 'absolute',
          width: `calc(${imgWidth} * 13)`,
          height: '13.25rem',
          objectFit: 'cover',
          left: `calc(-${counter} * ${imgWidth})`,
        }}
      />
    </figure>
  );
}
