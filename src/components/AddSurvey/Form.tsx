import { css } from '@emotion/react';
import { Tags } from 'api/type/survey';
import { Input } from 'components/Input';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { color } from 'style/color';
import { font } from 'style/font';
import Header from 'components/Header';
import Button from 'components/Button';
import addSurvey from 'api/survey/addSurvey';

export default function Form() {
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    choiceA: '가능',
    choiceB: '불가능',
    tag: ['BASIC'] as Tags,
  });
  const navigate = useNavigate();

  const tags = [
    'BASIC',
    'COUPLE',
    'DISPUTE',
    'EMOJI',
    'FOOD',
    'HEART',
    'HOT',
    'PUBLIC',
    'SESAME',
  ];

  const inputHandler = (event: ChangeEvent<HTMLFormElement>) => {
    if (event.target.name === 'tag') {
      setInputs({
        ...inputs,
        tag: [event.target.value],
      });
    } else
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value,
      });
  };

  const submitHandler = async () => {
    const response = await addSurvey(inputs);

    if (response.ok) {
      alert('등록이 완료 되었습니다');
      navigate(-1);
    } else {
      alert('등록에 실패했습니다!');
    }
  };

  return (
    <form
      css={{
        width: 'calc(100% - 2.25rem)',
        maxWidth: '30rem',
        height: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
      }}
      onChange={inputHandler}
    >
      <Header backButton>서베이 등록</Header>
      <Input label='제목'>
        <Input.TextField type='text' placeholder='18자 이내' name='title' />
      </Input>
      <Input label='내용'>
        <textarea
          css={css`
            font-family: ${font.input.fontFamily};
            font-size: ${font.input.fontSize};
            padding: 0.4375rem;
            display: block;
            width: 100%;
            height: 8.25rem;
            background: #fff;
            border: none;
            border-radius: 0.3125rem;
            resize: none;

            &::placeholder {
              color: #b2b2b2;
            }
            &:disabled {
              background: ${color.gray500};
            }
            &:focus {
              outline: none;
            }
          `}
          name='content'
          maxLength={140}
        />
      </Input>
      <div
        css={css`
          display: flex;
          gap: 10px;

          & > div > input::placeholder {
            color: black;
          }
        `}
      >
        <Input label='선택 1'>
          <Input.TextField placeholder='가능' name='choiceA' />
        </Input>
        <Input label='선택 2'>
          <Input.TextField placeholder='불가능' name='choiceB' />
        </Input>
      </div>
      <label
        css={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          fontSize: '1rem',
          color: color.blue300,
          textIndent: '0.25rem',
          marginBottom: '2px',
        }}
      >
        태그
      </label>
      <select
        css={{
          fontFamily: 'NanumSquareAcb',
          width: '100%',
          height: '2.75rem',
          fontSize: '1.125rem',
          lineHeight: 1.6,
          padding: '0 0.5rem',
          borderRadius: '0.3125rem',
        }}
        name='tag'
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <Button variant='form' onClick={submitHandler}>
        등록하기
      </Button>
    </form>
  );
}
