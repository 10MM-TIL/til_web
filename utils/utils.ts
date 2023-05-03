import instance from 'apis/instance';
import { deleteCookie, getCookie } from 'cookies-next';

export function getAuth() {
  if (typeof window !== undefined) {
    // TODO GET COOKIE
    return {
      // accessToken,
      accessToken: '',
    };
  }

  return null;
}
export function logout(isReload?: boolean) {
  try {
    instance.defaults.headers['Authorization'] = null;
    // TODO DELETE COOKIE
  } catch (error) {
    throw error;
  } finally {
    if (isReload) location.reload();
  }
}
