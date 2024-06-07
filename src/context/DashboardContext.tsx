import { ReactElement, createContext, useEffect, useReducer } from "react";
import { ApiResponse } from "../api";
import { message } from "antd";
import { createGymApi, gymFetchApi } from "../api/gym";
import { memberCreateApi, memberFetchApi } from "../api/member";
import { markAbsentApi, markPresentApi } from "../api/attendance";

type Props = {
  gymData: any;
  loading: boolean;
  statsLoading: boolean;
  membersData: any[];
};

type Action = {
  type: string;
  payload?: any;
};

type Reducer = (prevState: Props, action: Action) => Props;

const initialState: Props = {
  loading: false,
  gymData: null,
  statsLoading: false,
  membersData: [],
};

const reducer: Reducer = (prevState: Props, action: Action): Props => {
  switch (action.type) {
    case "loading":
    case "gymData":
    case "statsLoading":
    case "membersData":
      return { ...prevState, [action.type]: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type Context = {
  state: Props;
  dispatch: any;
  getGymDetails: () => void;
  createGym: (params: any) => void;
  getMemberDetails: () => void;
  markPresent: (member_id: string, params: any) => void;
  markAbsent: (member_id: string, params: any) => void;
  createMember: (params: any) => void;
};

export const DashboardContext = createContext<Context>({
  state: initialState,
  dispatch: null,
  getGymDetails: () => {},
  createGym: (params: any) => {},
  getMemberDetails: () => {},
  markPresent: (member_id: string, params: any) => {},
  markAbsent: (member_id: string, params: any) => {},
  createMember: (params: any) => {},
});

interface ContextProps {
  children?: ReactElement | null;
}

export const DashboardContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const getGymDetails = () => {
    dispatch({
      type: "loading",
      payload: true,
    });
    gymFetchApi()
      .then(({ data }: ApiResponse) => {
        if (data)
          dispatch({
            type: "gymData",
            payload: data,
          });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "loading",
          payload: false,
        });
      });
  };

  const createGym = (params: any) => {
    dispatch({
      type: "loading",
      payload: true,
    });
    createGymApi(params)
      .then(({ data }: ApiResponse) => {
        if (data)
          dispatch({
            type: "gymData",
            payload: data,
          });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "loading",
          payload: false,
        });
      });
  };

  const getMemberDetails = () => {
    dispatch({
      type: "statsLoading",
      payload: true,
    });
    memberFetchApi(state.gymData.id as string)
      .then(({ data }: ApiResponse) => {
        dispatch({
          type: "membersData",
          payload: data,
        });
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "statsLoading",
          payload: false,
        });
      });
  };

  const markPresent = (member_id: string, params: any) => {
    dispatch({
      type: "statsLoading",
      payload: true,
    });
    markPresentApi(member_id, params)
      .then(() => {
        message.info("Present marked successfuly");
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "statsLoading",
          payload: false,
        });
      });
  };

  const markAbsent = (member_id: string, params: any) => {
    dispatch({
      type: "statsLoading",
      payload: true,
    });
    markAbsentApi(member_id, params)
      .then(() => {
        message.info("Absent marked successfuly");
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "statsLoading",
          payload: false,
        });
      });
  };

  const createMember = ( params: any) => {
    dispatch({
      type: "statsLoading",
      payload: true,
    });
    memberCreateApi(state.gymData.id, params)
    .then(({ data }: ApiResponse) => {
      dispatch({
        type: "membersData",
        payload: [...state.membersData,data],
      });
    })
    .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        dispatch({
          type: "statsLoading",
          payload: false,
        });
      });
  };

  useEffect(() => {
    getGymDetails();
  }, []);

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
        createMember
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
