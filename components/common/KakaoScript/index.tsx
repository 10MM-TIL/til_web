import Script from 'next/script';

const KakaoScript = () => {
  const handleKakaoInit = () => {
    window.Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_LOGIN_ID}`);
  };

  return (
    <Script
      src={`https://t1.kakaocdn.net/kakao_js_sdk/${process.env.NEXT_PUBLIC_KAKAO_SDK_VERSION}/kakao.min.js`}
      integrity={`${process.env.NEXT_PUBLIC_KAKAO_SDK_INTEGRITY}`}
      crossOrigin='anonymous'
      onLoad={handleKakaoInit}
    />
  );
};

export default KakaoScript;
