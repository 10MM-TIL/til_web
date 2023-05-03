// 개발 서버에서만 console이 보이게하기 위한 로그 함수입니다.
export const devLogger = (...message: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...message);
  }
};

export const devError = (...message: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...message);
  }
};
