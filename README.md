# SeeSame

Live : https://seesame.co.kr

version: 0.01

로컬 실행 명령어 : <code>yarn start</code>

:warning: 환경변수 없이는 api가 제대로 동작하지 않습니다.

## 소개

- 다양한 논쟁거리를 숏폼 형태의 컨텐츠로 가볍게 접해볼 수 있습니다.
- 직접 투표하고 다른 사람들의 응답 통계를 확인할 수 있습니다.
- 댓글을 남겨 서로의 의견을 공유할 수 있습니다.

## 기술

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/asana-F06A6A?style=for-the-badge&logo=asana&logoColor=white"><img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

## Demo

시연 영상 추가 예정입니다.

## Trouble Shooting

#### 1. 이벤트 전파

- 문제 : 프로필 설정에서 이미지 변경 시 모달이 닫히지 않음
- 해결 과정 :
  1. 모달의 상위 컴포넌트에서 props로 전달 받은 함수로 모달 상태 제어 중
  2. 모달을 열고 닫는 데 모두 사용되므로 상태값을 !상태값으로 변경시키는 방식으로 작동
  3. 상태값을 추적해보니 변경되지 않는 게 아니라, 두 번 동작이 일어나 모달이 열린 상태값으로 돌아오는 것이었음
  4. 이벤트 동작 중 버블링에 의해 상위 컴포넌트의 이벤트까지 동작하게 됐던 것
  5. event 객체의 stopPropagation() 메서드를 통해 해결

#### 2. 폰트

- 문제 : 배포 후 IOS 사파리 환경에서 폰트가 제대로 로드 되지 않음
- 해결 과정 :
  1. App.css의 @import 구문에서 폰트가 설정되도록 작동 중
  2. 여러 기기 환경에서 접속해봤으나 Mac과 IOS에서만 적용되지 않는 것 같음
  3. 이상한 점은 첫화면의 제목 "SeeSame"만 폰트가 적용됐음
  4. Safari 개발자도구의 네트워크 탭을 통해 폰트를 받아오는 지 확인
  5. 폰트는 잘 받아지나, 미리보기 화면에서 영문만 보이고 한글은 보이지 않았음
  6. 폰트 변환 과정에서 한글 리소스가 누락된 것이었음
  7. 폰트 파일 변경 후 정상 작동, 이후의 폰트 변경으로 현재는 cdn을 통해 받아옴

#### 3. 두 개의 스크롤

- 문제 : 서베이 화면에서 결과창이 열린 상태에서도 스크롤 하고 싶음
- 해결 과정 :
  1. 결과창은 position: absolute 속성을 통해 상위 컴포넌트인 해당 서베이에 고정됨
  2. 결과창 뒤에 서베이 페이지가 여전히 존재하나, z축 상단에 나타난 결과창으로 인해 서베이 스크롤이 불가
  3. 스크롤 이벤트 발생 시 서베이 페이지가 아닌, 상위의 결과창 내에서 이벤트가 발생하기 때문
  4. 결과창에 스크롤 이벤트가 발생하지 않도록 CSS 속성인 pointer-events를 통해 조절
