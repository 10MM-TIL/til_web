import OAuthLoading from '@/components/Molecules/OAuthLoading';
import useGoogleLogin from '@/hooks/useGoogleLogin';

const OAuthGooglePage = () => {
  const { isLoading } = useGoogleLogin();
  return isLoading ? <OAuthLoading /> : null;
};

export default OAuthGooglePage;
