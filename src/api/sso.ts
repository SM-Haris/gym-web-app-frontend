const getQueryParams = (url: string): Record<string, unknown> => {
  const index = url.indexOf("?");
  if (index === -1) return {};

  const searchStr = url.slice(index + 1);
  const result = searchStr
    .split("&")
    .reduce((prev: Record<string, unknown>, current: string) => {
      const [key, val] = current.split("=");

      return {
        ...prev,
        [key]: val,
      };
    }, {});

  return result;
};

const TokenKey = "token";

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

export function toLoginPage(isTokenExpired?: boolean) {
  if (["/login", "/register"].includes(window.location.pathname)) {
    return;
  }
  removeToken();
  let href = `${window.location.origin}/login`;
  if (isTokenExpired) {
    href = href + "?isTokenExpired=true";
  }
  window.location.href = href;
}

export function ssoLogout() {
  removeToken();
  window.location.href = `${process.env.REACT_APP_API_URL}/api/yodo1/logout`;
}

export function getSSOToken() {
  const params = getQueryParams(window.location.href);
  return (params.access_token as string) || "";
}
