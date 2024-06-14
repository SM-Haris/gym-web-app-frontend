import { portalService, ssoService } from "./service";

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

export const checkoutApi = () => {
  return portalService({
    url: "/stripe/create-checkout-session",
    method: "post",
    data: {
      lookup_key: process.env.PRODUCT_LOOKUP_KEY
    },
  });
};

export const getUserApi = () => {
  return portalService({
    url: "/user/me",
    method: "get",
  });
};


export const deleteUserApi = (user_id: string) => {
  return portalService({
    url: `/user/${user_id}`,
    method: "delete",
  });
};