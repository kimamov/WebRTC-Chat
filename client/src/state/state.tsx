import React, { useContext, useReducer, ReactElement } from 'react'
import { reducer, Action } from './reducer'
import { Notification } from '../types/types'
export interface StateContext {
  isAuthenticated: boolean
  user: any
  darkMode: boolean
  notification: null | Notification
}

export interface Store {
  state: StateContext
  dispatch: React.Dispatch<Action>
}

const defaultState: StateContext = {
  isAuthenticated: false,
  user: null,
  darkMode: false,
  notification: null,
}
export const Context = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {},
})

export const useStateContext = () => useContext(Context)

// check if localStorage has some state otherwise apply default state
const persistentState=(defaultState: StateContext): StateContext=>{
  const data=localStorage.getItem('chatState');
  if(data) return JSON.parse(data); // if there id data hydrate the default state with it
  return defaultState // otherwise return the normal default state
}

export const StateProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, persistentState(defaultState))
  return <Context.Provider value={{ state, dispatch }} children={children} />
}
