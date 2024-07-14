import { createContext, Dispatch, SetStateAction, useState } from "react";

interface StateContext extends State {
  setState?: Dispatch<SetStateAction<State>>;
}

export const StateContext = createContext<StateContext>({});

interface StateProvider {
  children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProvider) => {
  const [state, setState] = useState<State>({
    page: 1
  });

  const _setState = (data: any) => {
    setState({
      ...state,
      ...data,
    });
  };

  return (
    <StateContext.Provider value={{ ...state, setState: _setState }}>
      {children}
    </StateContext.Provider>
  );
};
