import { ReactElement, createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { LoginBody, loginApi, ApiResponse, SignupBody, signupApi } from "../api";
import { message } from "antd";

type Props = {
  loading: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

type Reducer = (prevState: Props, action: Action) => Props;

const initialState: Props = {
  loading: false,
};

const reducer: Reducer = (prevState: Props, action: Action): Props => {
  switch (action.type) {
    case "loading":
      return { ...prevState, [action.type]: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type Context = {
  state: Props;
  dispatch: any;
  login: (params: LoginBody) => void;
  signup: (params: SignupBody) => void;
};

export const AuthContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  login: (params: LoginBody) => {},
  signup: (params: SignupBody) => {},
});

interface ContextProps {
  children?: ReactElement | null;
}

export const AuthContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);
  const navigate = useNavigate();
  
  const login = (params: LoginBody) => {
    dispatch({
      type: "loading",
      payload: true,
    });
    loginApi(params)
      .then(({ data }: ApiResponse) => {
        navigate("/dashboard");
      })
      .catch((error: any)=>{
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: "loading",
          payload: false,
        });
      });
  };

  const signup = (params: SignupBody) => {
    dispatch({
      type: "loading",
      payload: true,
    });
    signupApi(params)
      .then(({ data }: ApiResponse) => {
        navigate("/dashboard");
      })
      .catch((error: any)=>{
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: "loading",
          payload: false,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
