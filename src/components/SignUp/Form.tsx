import { ChangeEvent, useState } from 'react';
import { Input } from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import useSignUp from 'hooks/useSignUp';
import Button from 'components/Button';

interface Inputs {
  userid: string;
  password: string;
  passwordCheck: string;
  question: string;
  answer: string;
}

export default function Form() {
  const [inputs, setInputs] = useState<Inputs>({
    userid: '',
    password: '',
    passwordCheck: '',
    question: '나의 보물 1호는?',
    answer: '',
  });
  const [validMsg, setValidMsg] = useState<string>('');

  const questions = [
    '나의 보물 1호는?',
    '졸업한 초등학교 이름은?',
    '기억에 남는 추억의 장소는?',
    '하고싶은 말?',
    '나만 알아볼 수 있는 말은?',
  ];

  const { signUp, isPending, error } = useSignUp();

  const inputHandler = (event: ChangeEvent<HTMLFormElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async () => {
    const { userid, password, passwordCheck, question, answer } = inputs;
    if (!(userid && password && passwordCheck && question && answer)) {
      setValidMsg('빈 칸으로 제출할 수 없습니다.');
      return;
    }

    if (password !== passwordCheck) {
      setValidMsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    //
    setValidMsg('');
    await signUp({ userid, password, question, answer });
  };

  return (
    <form
      css={{
        width: 'calc(100% - 2.25rem)',
        maxWidth: '30rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
      onChange={inputHandler}
    >
      <Input label='아이디'>
        <Input.TextField type='text' id='sign-up-id' name='userid' />
      </Input>
      <Input label='패스워드' css={{ marginTop: '2.125rem' }}>
        <Input.TextField
          type='password'
          id='sign-up-password'
          name='password'
        />
      </Input>
      <Input label='패스워드 확인'>
        <Input.TextField
          type='password'
          id='sign-up-password-check'
          name='passwordCheck'
        />
      </Input>
      <Input
        label='질문 답변'
        css={{
          marginTop: '4.5625rem',
        }}
      >
        <select
          id='sign-up-question'
          name='question'
          css={{
            fontFamily: 'NanumSquareAcb',
            width: '100%',
            height: '2.75rem',
            fontSize: '1.125rem',
            lineHeight: 1.6,
            padding: '0 0.5rem',
            borderRadius: '0.3125rem',
          }}
        >
          {questions.map((question) => (
            <option key={question} value={question}>
              {question}
            </option>
          ))}
        </select>
      </Input>
      <Input>
        <Input.TextField type='text' id='sign-up-answer' name='answer' />
      </Input>
      <ErrorMessage msg={validMsg || error} />
      <Button variant='form' disabled={isPending} onClick={submitHandler}>
        가입하기
      </Button>
    </form>
  );
}
