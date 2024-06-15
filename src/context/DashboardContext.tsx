import { ReactElement, createContext, useEffect, useReducer } from 'react'
import { ApiResponse } from '../api'
import { message } from 'antd'
import {
  createGymApi,
  gymFetchApi,
  gymRevenueApi,
  updateGymApi,
} from '../api/gym'
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
import { GymDataInterface, GymInterface } from '../interfaces/gym'
import { MemberDataInterface, MemberInterface } from '../interfaces/member'
import {
  AttendanceInterface,
  FetchStatsInterface,
} from '../interfaces/attendance'
import dayjs from 'dayjs'

type Props = {
  gymData: GymDataInterface | null
  loading: boolean
  statsLoading: boolean
  membersData: MemberDataInterface[] | []
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
  createGym: (params: GymInterface) => void
  updateGym: (params: GymInterface) => void
  getMemberDetails: () => void
  markPresent: (member_id: string, params: AttendanceInterface) => void
  markAbsent: (member_id: string, params: AttendanceInterface) => void
  updateMember: (member_id: string, params: MemberInterface) => Promise<boolean>
  createMember: (params: MemberInterface) => Promise<boolean>
  deleteMember: (member_id: string) => Promise<boolean>
  getAttendanceHours: (member_id: string, params: FetchStatsInterface) => void
  getAttendanceStats: (gym_id: string, params: FetchStatsInterface) => void
  getGymRevenue: (gym_id: string, params: FetchStatsInterface) => void
}

export const DashboardContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  getGymDetails: () => {},
  createGym: (params: GymInterface) => {},
  updateGym: (params: GymInterface) => {},
  getMemberDetails: () => {},
  markPresent: (member_id: string, params: AttendanceInterface) => {},
  markAbsent: (member_id: string, params: AttendanceInterface) => {},
  createMember: (params: MemberInterface) => {
    return Promise.reject()
  },
  updateMember: (member_id: string, params: MemberInterface) => {
    return Promise.reject()
  },
  deleteMember: (member_id: string) => {
    return Promise.reject()
  },
  getAttendanceHours: (member_id: string, params: FetchStatsInterface) => {},
  getAttendanceStats: (gym_id: string, params: FetchStatsInterface) => {},
  getGymRevenue: (gym_id: string, params: FetchStatsInterface) => {},
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

  const createGym = (params: GymInterface) => {
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

  const updateGym = (params: GymInterface) => {
    if (!state.gymData) return

    dispatch({
      type: 'loading',
      payload: true,
    })
    updateGymApi(state.gymData.id, params)
      .then(({ data }: ApiResponse) => {
        if (data)
          dispatch({
            type: 'gymData',
            payload: data[1][0],
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
    if (!state.gymData) return

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

  const markPresent = (member_id: string, params: AttendanceInterface) => {
    if (!state.gymData) return

    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    markPresentApi(member_id, { ...params, gym_id: state.gymData.id })
      .then(() => {
        if (params.date === dayjs().toISOString().split('T')[0])
          dispatch({
            type: 'membersData',
            payload: state.membersData.map((item) =>
              item.id === member_id
                ? { ...item, is_present_today: !item.is_present_today }
                : item
            ),
          })
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

  const markAbsent = (member_id: string, params: AttendanceInterface) => {
    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    markAbsentApi(member_id, params)
      .then(() => {
        if (params.date === dayjs().toISOString().split('T')[0])
          dispatch({
            type: 'membersData',
            payload: state.membersData.map((item) =>
              item.id === member_id
                ? { ...item, is_present_today: !item.is_present_today }
                : item
            ),
          })
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
    params: MemberInterface
  ): Promise<boolean> => {
    let isUpdate = false

    dispatch({
      type: 'statsLoading',
      payload: true,
    })
    await memberUpdateApi(member_id, params)
      .then(({ data }: ApiResponse) => {
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

  const getAttendanceHours = (
    member_id: string,
    params: FetchStatsInterface
  ) => {
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

  const getAttendanceStats = (gym_id: string, params: FetchStatsInterface) => {
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

  const getGymRevenue = (gym_id: string, params: FetchStatsInterface) => {
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

  const createMember = async (params: MemberInterface): Promise<boolean> => {
    if (!state.gymData) return false

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

  const deleteMember = async (member_id: string): Promise<boolean> => {
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
        updateGym,
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
