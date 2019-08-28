export default function Auth() {
  if(getLoginUser() === null) {
    return false;
  }
}

export function setLoginUser(user) {
  sessionStorage.setItem('LOGIN_USER', JSON.stringify(user));
}

export function getLoginUser() {
  let userStr = sessionStorage.getItem('LOGIN_USER');
  if(userStr)  return JSON.parse(userStr);
  return null;
}