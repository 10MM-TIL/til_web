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
// 2023-03-17T04:16:51.490+00:00 >
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
}
