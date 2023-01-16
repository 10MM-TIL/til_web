# TIL_WEB

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


# ⭐️ Stack

- **Framework:** Next.js
- **Library:** React 18
- **State Management:** React Query, Recoil
- **Styling:** Emotion
