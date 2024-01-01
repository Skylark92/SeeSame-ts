# SeeSame

Live : https://seesame.co.kr

version: 0.03

로컬 실행 명령어 : <code>yarn start</code>

:warning: 환경변수 없이는 api가 제대로 동작하지 않습니다.

## 소개

- 다양한 논쟁거리를 숏폼 형태의 컨텐츠로 가볍게 접해볼 수 있습니다.
- 직접 투표하고 다른 사람들의 응답 통계를 확인할 수 있습니다.
- 댓글을 남겨 서로의 의견을 공유할 수 있습니다.

## version 0.02 변경사항

1. 이제부터 아직 응답하지 않은 서베이가 우선적으로 표시됩니다.
2. 사용자 관련 메뉴를 버튼 뿐만 아니라 여백의 공간을 클릭해 닫을 수 있습니다.
3. 더이상 ID 입력 시 첫 글자가 대문자로 자동 변환되지 않습니다.
4. 서베이 이미지가 4개 더 추가되어 다채로워졌습니다.

## version 0.03 변경사항

1. 결과화면에 공유하기 버튼이 추가 됐습니다.
2. 서베이 내용 영역을 구분해 가시성을 높여봤습니다.
3. 댓글 전송 아이콘 크기를 변경했습니다.
4. 부족하나마 카카오톡 브라우저에서 서베이가 화면을 벗어나지 않도록 수정했습니다.

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

#### 4. IOS 환경 이슈

- 문제 : IOS 환경(모바일, 맥)에서 서베이 화면 진입 시 엄청난 부하가 걸리는 것을 발견
- 해결 과정 :
  1. 원인이 예상되지 않아 커밋을 돌아가며 추적
  2. 서베이 버튼에 추가했던 체크 표시로 인한 부하였음
  3. 서베이 버튼은 조건에 따라 변경하는 CSS였고, 버튼의 가상요소로 추가했었음
  4. 가상요소가 아닌, html요소로 사용해도 같은 문제가 있으며 background를 이미지가 아닌 일반 색상 등 다른 걸로 시도해도 같은 현상 발생
  5. 속성들을 추가해보면서 확인한 결과, position: absolute 속성이 safari에서 부하를 유발함

#### 5. 카카오톡 브라우저 환경 이슈 (해결 중)

- 문제 : 카카오톡 브라우저 환경에서 스크롤 시 서베이가 화면 영역에 제대로 자리잡지 못함
- 해결 과정 :
  1. 카카오톡 브라우저의 경우 스크롤 시에 일시적으로 주소창이 나타나며 resize 이벤트가 발생
  2. 서베이 영역 스크롤은 scroll-snap 속성을 이용해 자동으로 서베이를 화면에 위치 시킴
  3. 스크롤을 시작할 때에 스크롤이 멈출 위치가 결정되고, 이후 resize 이벤트가 발생하며 요소들의 크기가 변경되어 발생하는 현상으로 파악
  4. resize 이벤트 발생 시 스크롤을 1px 움직여 다시 snap 하도록 조치
  5. (미적용) 각 요소들의 인덱스 및 높이를 계산해 의도된 위치로 이동하는 것이 최적이라 생각 -> 스크롤의 방향도 고려해야 할 듯
