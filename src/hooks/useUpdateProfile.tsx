import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PFUPDATE } from '../store/authSlice';
import { Profile } from 'api/type/user';
import setProfile from 'api/user/setProfile';

function useUpdateProfile() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = async (
    userid: string | undefined | null,
    data: Profile,
  ) => {
    if (!userid) return;
    setIsPending(true); // 통신 시작
    const response = await setProfile(userid, data);

    if (response.ok) {
      // 프로필 변경 성공 시 상태 업데이트
      dispatch(PFUPDATE(response.profile));
      setError(null); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
      navigate(-1);
    } else {
      if (typeof response.message === 'string') setError(response.message);
      alert('Error! : ' + response.message);
      navigate(-1);
      setIsPending(false); // 통신 종료
    }
  };

  return { updateProfile, isPending, error };
}

export default useUpdateProfile;
