# TIL_WEB

# url
product: [https://www.bricklog.io/](https://www.bricklog.io/)
dev: [https://dev.bricklog.io/](https://dev.bricklog.io/)

Kick off your project with this boilerplate.

# 🚀 Quick Start

```bash
git clone
cd
npm install
npm run dev
```

your site is now running at `http://localhost:3000`

# 📁 Folder Structure

A quick look at the directories you'll see in this project.

### Root driectory layout

    .
    ├── assets              #
      ├── fonts
      ├── images
      └── svgs
    ├── components          #
      └── common
    ├── constants           #
    ├── hooks               # Custom hooks/queries
    ├── pages               #
    ├── stores              # (alternatively `store`)
    ├── styles              
    ├── utils               #
    ├── types               #
    ├── README.md           #
    └── ...

### 🐪 Others

Always use camelCase for others.

- scripts
- folders
- variables
- functions

# 📕 Rules

## Git-flow

- main - release - develop branch // feature branch
- main : 형상 유지만을 위한 브랜치
- release : 실제 배포를 위한 브랜치
- develop : 개발 테스트 및 QA 작업 진행용 브랜치
- release 에서 브랜치 따서 작업 후 develop 브랜치에 merge
- develop > release merge 시 code review 진행
- 주기적 형상 유지를 위해 release > main 브랜치 싱크 유지

## Code-Review

- develop > release merge 시 코드리뷰 진행
- 전 인원 함께 코드 파악 진행
- + 룰 개발 진행하면서 정립


## 📛 Naming

### 👨‍🦳 React Component

- **Extensions:** Use .tsx extension for React components.

- **Filename:** Use PascalCase for filenames. E.g., ReservationCard.tsx.

- **Reference Naming:** Use PascalCase for React components and camelCase for their instances.

  ```tsx
  // bad
  import reservationCard from './ReservationCard';

  // good
  import ReservationCard from './ReservationCard';

  // bad
  const ReservationItem = <ReservationCard />;

  // good
  const reservationItem = <ReservationCard />;
  ```
## 📛 Commit Message

### 메시지 구조
커밋 메시지는 세가지 파트로 나누고 각 파트는 빈줄을 두어서 구분합나다.

```
type: subject
body(옵션)
footer(옵션)
```

- type : 어떤 의도로 커밋했는지를 type에 명시합니다. 자세한 사항은 아래서 설명하겠습니다.
- subject : 최대 50글자가 넘지 않도록 하고 마침표는 찍지 않습니다. 영문으로 표기하는 경우 동사(원형)을 가장 앞에 두고 첫글자는 대문자로 표기합니다. 
- body: 긴 설명이 필요한 경우에 작성합니다. 어떻게 했는지가 아니라, 무엇을 왜 했는지 작성합니다. 최대 75글자를 넘기지 않도록 합니다.
- footer : issue tracker ID를 명시하고 싶은 경우에 작성합니다.

### 타입 type
- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서의 수정
- style : (코드의 수정 없이) 스타일(style)만 변경(들여쓰기 같은 포맷이나 세미콜론을 빼먹은 경우)
- refactor : 코드를 리펙토링
- test : Test 관련한 코드의 추가, 수정
- chore : (코드의 수정 없이) 설정을 변경

# ⭐️ Stack

- **Framework:** Next.js
- **Library:** React 18
- **State Management:** React Query, Recoil
- **Styling:** Emotion
