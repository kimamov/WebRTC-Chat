import React, { useContext, useState, useReducer, ReactElement } from 'react'
import { IContact } from './Contact'
import { reducer, Action } from './reducer'

export interface StateContext {
  isAuthenticated: boolean
  user: any
  contacts: IContact[]
  darkMode: boolean
}

export interface Store {
  state: StateContext
  dispatch: React.Dispatch<Action>
}

const data: IContact[] = [
  {
    id: 1,
    name: 'Ted',
    phone: '+1-541-754-3010',
    address: 'Street 1',
    isPrivate: true,
  },
  {
    id: 2,
    name: 'Ted 2',
    phone: '+1-541-154-8377',
    address: 'Street 2',
    isPrivate: false,
  },
  {
    id: 3,
    name: 'Ted 3',
    phone: '+1-541-763-9221',
    address: 'Street 3',
    isPrivate: false,
  },
]

const defaultState: StateContext = {
  isAuthenticated: false,
  contacts: data,
  user: {},
  darkMode: false,
}
export const Context = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {},
})

export const useStateContext = () => useContext(Context)

export const StateProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  return <Context.Provider value={{ state, dispatch }} children={children} />
}
