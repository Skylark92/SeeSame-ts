import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Age, Gender, MBTI, Profile, ProfileImage } from 'api/type/user';
import Field from './Form/Field';
import Radio from './Form/Radio';
import Image from './Form/Image';
import Input from './Form/Input';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import useUpdateProfile from 'hooks/useUpdateProfile';
import tempName from 'util/tempName';

type ProfileInputs = {
  profileImage: ProfileImage;
  nickname: string;
  gender: Gender | null;
  age: Age | null;
  EI: 'E' | 'I' | null;
  SN: 'S' | 'N' | null;
  TF: 'T' | 'F' | null;
  JP: 'J' | 'P' | null;
};

export default function Form() {
  const user = useSelector((state: RootState) => state.auth.user); // 유저 상태
  if (!user) return;

  let nickname, profileImage, gender, age, MBTI;

  if (user.profile) {
    ({ nickname, profileImage, gender, age, MBTI } = user.profile);
  }

  let EI, SN, TF, JP;

  if (MBTI) {
    [EI, SN, TF, JP] = MBTI.split('');
  }

  const [inputs, setInputs] = useState<ProfileInputs>({
    profileImage: profileImage ? profileImage : 'profile-image-01',
    nickname: nickname ? nickname : tempName(user._id),
    gender: gender || null,
    age: age || null,
    EI: (EI as ProfileInputs['EI']) || null,
    SN: (SN as ProfileInputs['SN']) || null,
    TF: (TF as ProfileInputs['TF']) || null,
    JP: (JP as ProfileInputs['JP']) || null,
  });

  const [isValid, setIsValid] = useState<boolean>(false); // 유효성 상태
  const { updateProfile, isPending, error } = useUpdateProfile();

  useEffect(() => {
    if (Object.values(inputs).includes(null) || inputs.nickname === '')
      setIsValid(false);
    else setIsValid(true);
  }, [inputs]);

  useEffect(() => {
    for (const key in inputs) {
      if (key === 'nickname' || key === 'profileImage') continue;
      const radioInput = document.getElementById(
        inputs[key as keyof ProfileInputs] || '',
      ) as HTMLInputElement;
      if (radioInput) radioInput.checked = true;
    }
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLFormElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }; // 입력값 상태 관리

  const submitHandler = async () => {
    const { nickname, gender, age, profileImage, ...MBTI } = inputs;
    if (!(gender && age)) return;

    const profileData: Profile = {
      nickname,
      profileImage,
      gender: gender,
      age: age,
      MBTI: Object.values(MBTI).join('') as MBTI,
    };

    updateProfile(user?._id, profileData);
  }; // 프로필 데이터 제출

  return (
    <form css={{ margin: '1rem auto 0.6875rem' }} onChange={inputHandler}>
      <Image imageIndex={inputs.profileImage} />
      <Input nickname={inputs.nickname} />
      <Field
        title='성별'
        css={{
          display: 'flex',
          gap: '0.375rem',
        }}
      >
        {['남자', '여자'].map((gender) => (
          <Radio key={gender} id={gender} name='gender' variant='large' />
        ))}
      </Field>
      <Field
        title='연령대'
        css={{
          display: 'flex',
          gap: '0.375rem',
        }}
      >
        {['10대', '20대', '30대', '40대', '청춘'].map((age) => (
          <Radio key={age} id={age} name='age' variant='small' />
        ))}
      </Field>
      <Field
        title='MBTI'
        css={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplate: `
            "E S T J"
            "I N F P"
          `,
          gap: '0.375rem',
        }}
      >
        {['E', 'I'].map((EI) => (
          <Radio
            css={{ gridArea: EI }}
            key={EI}
            id={EI}
            name='EI'
            variant='small'
          />
        ))}
        {['S', 'N'].map((SN) => (
          <Radio
            css={{ gridArea: SN }}
            key={SN}
            id={SN}
            name='SN'
            variant='small'
          />
        ))}
        {['T', 'F'].map((TF) => (
          <Radio
            css={{ gridArea: TF }}
            key={TF}
            id={TF}
            name='TF'
            variant='small'
          />
        ))}
        {['J', 'P'].map((JP) => (
          <Radio
            css={{ gridArea: JP }}
            key={JP}
            id={JP}
            name='JP'
            variant='small'
          />
        ))}
      </Field>
      <ErrorMessage msg={error} />
      <Button
        variant='form'
        css={{ fontSize: '1.25rem', marginTop: '0.5rem' }}
        disabled={!isValid || isPending}
        onClick={submitHandler}
      >
        확인
      </Button>
    </form>
  );
}
