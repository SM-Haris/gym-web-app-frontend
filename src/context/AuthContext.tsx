import { ReactElement, createContext, useReducer } from 'react'
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
  deleteUserApi,
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
  deleteUser: (user_id: string) => void
  signup: (params: SignupBody) => void
  checkout: (params: SignupBody) => void
}

export const AuthContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  login: (params: LoginBody) => {},
  logout: () => {},
  getUser: () => {},
  deleteUser: (user_id: string) => {},
  signup: (params: SignupBody) => {},
  checkout: (params: SignupBody) => {},
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

  const deleteUser = (user_id: string) => {
    dispatch({
      type: 'loading',
      payload: true,
    })

    deleteUserApi(user_id)
      .then(() => {})
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

  const checkout = (params: SignupBody) => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    checkoutApi()
      .then(({ data }: ApiResponse) => {
        localStorage.setItem('sign_up_data', JSON.stringify(params))
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
      payload: null,
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
        getUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
