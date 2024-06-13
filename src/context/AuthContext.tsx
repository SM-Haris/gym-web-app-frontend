import { ReactElement, createContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LoginBody,
  loginApi,
  ApiResponse,
  SignupBody,
  signupApi,
  checkoutApi,
  removeToken,
  getUserApi,
  getToken,
} from '../api'
import { message } from 'antd'

type Props = {
  loading: boolean
  checkoutSessionId: string
  signUpData: any
  user: any
}

type Action = {
  type: string
  payload?: any
}

type Reducer = (prevState: Props, action: Action) => Props

const initialState: Props = {
  loading: false,
  checkoutSessionId: '',
  signUpData: null,
  user: null,
}

const reducer: Reducer = (prevState: Props, action: Action): Props => {
  switch (action.type) {
    case 'loading':
    case 'checkoutSessionId':
    case 'signUpData':
    case 'user':
      return { ...prevState, [action.type]: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

type Context = {
  state: Props
  dispatch: any
  login: (params: LoginBody) => void
  logout: () => void
  getUser: () => void
  signup: (params: SignupBody) => void
  checkout: () => void
}

export const AuthContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  login: (params: LoginBody) => {},
  logout: () => {},
  getUser: () => {},
  signup: (params: SignupBody) => {},
  checkout: () => {},
})

interface ContextProps {
  children?: ReactElement | null
}

export const AuthContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState)
  const navigate = useNavigate()

  const login = (params: LoginBody) => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    loginApi(params)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'user',
          payload: data,
        })
        navigate('/dashboard')
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })
  }

  const signup = (params: SignupBody) => {
    dispatch({
      type: 'loading',
      payload: true,
    })

    signupApi(params)
      .then(() => {
        checkout()
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })
  }

  const checkout = () => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    checkoutApi()
      .then(({ data }: ApiResponse) => {
        window.location.href = data.url
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })
  }

  const getUser = () => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    getUserApi()
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'user',
          payload: data,
        })
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })
  }


  const logout = () => {
    dispatch({
      type: 'user',
      payload:null,
    })
    removeToken()
    navigate('/home')
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        signup,
        checkout,
        logout,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
