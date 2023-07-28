import Button from 'components/Button';
import SurveyContext from 'context/SurveyContext';
import { PropsWithChildren, useContext } from 'react';
import { color } from 'style/color';

interface FormProps extends PropsWithChildren {
  handler: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export default function Form({ handler }: FormProps) {
  const context = useContext(SurveyContext);

  return (
    <form
      css={{
        width: '100%',
        maxWidth: '22.875rem',
        display: 'flex',
        gap: '0.625rem',
      }}
    >
      <Button
        variant='survey'
        name='choiceA'
        css={{ background: color.green500 }}
        onClick={handler}
      >
        {context?.data.choiceA}
      </Button>
      <Button
        variant='survey'
        name='choiceB'
        css={{ background: color.violet500 }}
        onClick={handler}
      >
        {context?.data.choiceB}
      </Button>
    </form>
  );
}
