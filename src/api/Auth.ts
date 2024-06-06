import { ssoService } from "./service";

export type LoginBody = {
  email: string;
  password: string;
};

export type SignupBody = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};

export const loginApi = (loginBody: LoginBody) => {
  return ssoService({
    url: "/auth/login",
    method: "post",
    data: loginBody,
  });
};

export const signupApi = (signupBody: SignupBody) => {
  return ssoService({
    url: "/auth/signup",
    method: "post",
    data: signupBody,
  });
};
