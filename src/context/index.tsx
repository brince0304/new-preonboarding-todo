import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

type Action = { type: 'SET_TOKEN'; token: string | null };
type State = { token: string | null };
type AppDispatch = Dispatch<Action>;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.token };
    default:
      return state;
  }
};

const initialState: State = {
  token: null,
};

const setToken = (dispatch: AppDispatch, token: string | null) => {
  dispatch({ type: 'SET_TOKEN', token });
};

const stateName = 'tokenState';

const AuthStateContext = createContext<State | null>(null);
const AuthDispatchContext = createContext<Dispatch<Action> | null>(null);

const useAuthState = () => {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error('AuthProvider not found');
  return state;
};

const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error('AuthProvider not found');
  return dispatch;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem(stateName);
    if (storedState) {
      setToken(dispatch, JSON.parse(storedState).token);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(stateName, JSON.stringify(state));
  }, [state]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export { AuthProvider, useAuthState, useAuthDispatch, setToken };
