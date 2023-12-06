import { css } from '@emotion/react';
import Button from 'components/Button';
import SurveyContext from 'context/SurveyContext';
import { PropsWithChildren, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { color } from 'style/color';

interface FormProps extends PropsWithChildren {
  handler: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

export default function Form({ handler }: FormProps) {
  const user = useSelector((state: RootState) => state.auth)?.user;
  const context = useContext(SurveyContext);

  return (
    <form
      css={css`
        width: 100%;
        max-width: 22.875rem;
        display: flex;
        gap: 0.625rem;

        & > [name=${context?.data.users[user!._id]?.choice}] {
          outline: 3px solid #fff;
          position: relative;
        }
      `}
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
