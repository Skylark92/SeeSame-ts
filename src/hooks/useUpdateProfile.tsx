import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PFUPDATE } from '../store/authSlice';
import setProfile from 'api/user/setProfile';
import { UserProfile } from 'api/type';

function useUpdateProfile() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProfile = async (
    id: string | undefined | null,
    data: UserProfile,
  ) => {
    if (!id) return;
    setIsPending(true); // 통신 시작
    const response = await setProfile(id, data);

    if (response.ok) {
      // 프로필 변경 성공 시 상태 업데이트
      dispatch(PFUPDATE(response.payload));
      setError(null); // 에러 발생하지 않음
      setIsPending(false); // 통신 종료
      navigate(-1);
    } else {
      if (typeof response.message === 'string') setError(response.message);
      // alert('Error! : ' + response.message);
      setIsPending(false); // 통신 종료
    }
  };

  return { updateProfile, isPending, error };
}

export default useUpdateProfile;
