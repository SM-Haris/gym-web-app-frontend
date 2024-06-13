import { ReactElement, createContext, useEffect, useReducer } from 'react'
import { ApiResponse } from '../api'
import { message } from 'antd'
import { createGymApi, gymFetchApi, gymRevenueApi } from '../api/gym'
import {
  memberCreateApi,
  memberDeleteApi,
  memberFetchApi,
  memberStatsApi,
  memberUpdateApi,
} from '../api/member'
import {
  getAttendaceHoursApi,
  markAbsentApi,
  markPresentApi,
} from '../api/attendance'

type Props = {
  gymData: any
  loading: boolean
  statsLoading: boolean
  membersData: any[]
  attendanceHours: { [key: string]: any }
  attendanceStats: []
  revenueDetails: []
}

type Action = {
  type: string
  payload?: any
}

type Reducer = (prevState: Props, action: Action) => Props

const initialState: Props = {
  loading: false,
  gymData: null,
  statsLoading: false,
  membersData: [],
  attendanceHours: {},
  attendanceStats: [],
  revenueDetails: [],
}

const reducer: Reducer = (prevState: Props, action: Action): Props => {
  switch (action.type) {
    case 'loading':
    case 'gymData':
    case 'statsLoading':
    case 'membersData':
    case 'attendanceHours':
    case 'attendanceStats':
    case 'revenueDetails':
      return { ...prevState, [action.type]: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

type Context = {
  state: Props
  dispatch: any
  getGymDetails: () => void
  createGym: (params: any) => void
  getMemberDetails: () => void
  markPresent: (member_id: string, params: any) => void
  markAbsent: (member_id: string, params: any) => void
  updateMember: (member_id: string, params: any) => Promise<boolean>
  createMember: (params: any) => Promise<boolean>
  deleteMember: (member_id: any) => Promise<boolean>
  getAttendanceHours: (member_id: string, params: any) => void
  getAttendanceStats: (gym_id: string, params: any) => void
  getGymRevenue: (gym_id: string, params: any) => void
}

export const DashboardContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  getGymDetails: () => {},
  createGym: (params: any) => {},
  getMemberDetails: () => {},
  markPresent: (member_id: string, params: any) => {},
  markAbsent: (member_id: string, params: any) => {},
  createMember: (params: any) => {
    return Promise.reject()
  },
  updateMember: (member_id: string, params: any) => {
    return Promise.reject()
  },
  deleteMember: (member_id: any) => {
    return Promise.reject()
  },
  getAttendanceHours: (member_id: string, params: any) => {},
  getAttendanceStats: (gym_id: string, params: any) => {},
  getGymRevenue: (gym_id: string, params: any) => {},
})

interface ContextProps {
  children?: ReactElement | null
}

export const DashboardContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState)

  const getGymDetails = () => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    gymFetchApi()
      .then(({ data }: ApiResponse) => {
        if (data)
          dispatch({
            type: 'gymData',
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

  const createGym = (params: any) => {
    dispatch({
      type: 'loading',
      payload: true,
    })
    createGymApi(params)
      .then(({ data }: ApiResponse) => {
        if (data)
          dispatch({
            type: 'gymData',
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

  const getMemberDetails = () => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    memberFetchApi(state.gymData.id as string)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'membersData',
          payload: data,
        })
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const markPresent = (member_id: string, params: any) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    markPresentApi(member_id, {...params,gym_id:state.gymData.id})
      .then(() => {
        message.info('Present marked successfuly')
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const markAbsent = (member_id: string, params: any) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    markAbsentApi(member_id, params)
      .then(() => {
        message.info('Absent marked successfuly')
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const updateMember = async (
    member_id: string,
    params: any
  ): Promise<boolean> => {
    let isUpdate = false

    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    await memberUpdateApi(member_id, params)
      .then(({ data }: ApiResponse) => {
        console.log(data[1][0])
        dispatch({
          type: 'membersData',
          payload: state.membersData.map((item) =>
            item.id === member_id
              ? { ...data[1][0], is_present_today: item.is_present_today }
              : item
          ),
        })
        message.info('Member updated successfuly')
        isUpdate = true
      })
      .catch((error: any) => {
        message.error(error.message)
        isUpdate = false
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })

    return isUpdate
  }

  const getAttendanceHours = (member_id: string, params: any) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    getAttendaceHoursApi(member_id, params)
      .then(({ data }: ApiResponse) => {
        state.attendanceHours[member_id] = data
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const getAttendanceStats = (gym_id: string, params: any) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    memberStatsApi(gym_id, params)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'attendanceStats',
          payload: data,
        })
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const getGymRevenue = (gym_id: string, params: any) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    gymRevenueApi(gym_id, params)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'revenueDetails',
          payload: data,
        })
      })
      .catch((error: any) => {
        message.error(error.message)
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })
  }

  const createMember = async (params: any): Promise<boolean> => {
    let isCreated = false

    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    await memberCreateApi(state.gymData.id, params)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'membersData',
          payload: [...state.membersData, data],
        })
        isCreated = true
      })
      .catch((error: any) => {
        message.error(error.message)
        isCreated = false
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })

    return isCreated
  }

  const deleteMember = async (member_id: any): Promise<boolean> => {
    let isDeleted = false

    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    await memberDeleteApi(member_id)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: 'membersData',
          payload: state.membersData.filter(
            (member) => member.id !== member_id
          ),
        })
        isDeleted = true
      })
      .catch((error: any) => {
        isDeleted = false
      })
      .finally(() => {
        dispatch({
          type: 'statsLoading',
          payload: false,
        })
      })

    return isDeleted
  }

  useEffect(() => {
    if (!state.gymData) {
      getGymDetails()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (state.gymData) {
      getMemberDetails()
    }
    // eslint-disable-next-line
  }, [state.gymData])

  return (
    <DashboardContext.Provider
      value={{
        state,
        dispatch,
        getGymDetails,
        getMemberDetails,
        createGym,
        markPresent,
        markAbsent,
        createMember,
        getAttendanceHours,
        getAttendanceStats,
        getGymRevenue,
        deleteMember,
        updateMember,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
