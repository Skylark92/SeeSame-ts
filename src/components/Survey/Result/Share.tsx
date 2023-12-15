import Button from 'components/Button';
import SurveyContext from 'context/SurveyContext';
import { useContext } from 'react';

export default function Share() {
  const survey = useContext(SurveyContext)?.data;

  const share = () => {
    const url = survey?._id
      ? `https://seesame.co.kr/${survey?._id}?result=true`
      : `${window.location.href}?result=true`;
    const text = survey?._id ? `${survey?.title} - 어떻게 생각해?` : '이거 어떻게 생각해?';

    const shareData = {
      title: 'SeeSame',
      text: text,
      url: url,
    };
    if (navigator.canShare(shareData)) {
      navigator.share(shareData);
    } else {
      // share가 사용 불가능할 때는 주소 복사 (데스크탑 사용 예상)
      navigator.clipboard.writeText(url).then(() => alert('현재 주소가 복사되었습니다. 공유해보세요!'));
    }
  };

  return (
    <Button css={{ position: 'absolute', bottom: '-1rem', right: 0, zIndex: '11' }} onClick={share}>
      Share
    </Button>
  );
}
