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
  validateUserApi,
  updateUserApi,
} from '../api'
import { message } from 'antd'
import {
  SignUpDataInterface,
  UserInterface,
  UserUpdationInterface,
  UserValidationValues,
} from '../interfaces/auth'

type Props = {
  loading: boolean
  checkoutSessionId: string
  signUpData: SignUpDataInterface | null
  user: UserInterface | null
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
    case 'clear':
      return initialState
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
  deleteUser: () => Promise<boolean>
  signup: (params: SignupBody) => void
  checkout: (params: SignupBody) => void
  validateUser: (params: UserValidationValues) => Promise<boolean>
  updateUser: (params: UserUpdationInterface) => Promise<boolean>
}

export const AuthContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  login: (params: LoginBody) => {},
  logout: () => {},
  getUser: () => {},
  deleteUser: () => {
    return Promise.reject()
  },
  signup: (params: SignupBody) => {},
  checkout: (params: SignupBody) => {},
  validateUser: (params: UserValidationValues) => {
    return Promise.reject()
  },
  updateUser: (params: UserUpdationInterface) => {
    return Promise.reject()
  },
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
        message.error(error.response.data.message)
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

  const validateUser = async (
    params: UserValidationValues
  ): Promise<boolean> => {
    let isValidated = false

    dispatch({
      type: 'loading',
      payload: true,
    })

    await validateUserApi(params)
      .then(() => {
        isValidated = true
      })
      .catch(() => {
        message.error(
          'User with this email alreay exists. Please try another email'
        )
        isValidated = false
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })
    return isValidated
  }

  const deleteUser = async (): Promise<boolean> => {
    let isDeleted = false

    dispatch({
      type: 'loading',
      payload: true,
    })

    await deleteUserApi()
      .then(() => {
        isDeleted = true
        dispatch({
          type: 'clear',
          payload: true,
        })
      })
      .catch((error: any) => {
        isDeleted = false
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })

    return isDeleted
  }

  const checkout = (params: SignupBody) => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    checkoutApi()
      .then(({ data }: ApiResponse) => {
        console.log(data)
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

  const updateUser = async (
    params: UserUpdationInterface
  ): Promise<boolean> => {
    let isUpdated = false

    dispatch({
      type: 'loading',
      payload: true,
    })

    await updateUserApi(params)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'user',
          payload: data,
        })
        isUpdated = true
      })
      .catch(() => {
        isUpdated = false
      })
      .finally(() => {
        dispatch({
          type: 'loading',
          payload: false,
        })
      })

    return isUpdated
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
        validateUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
