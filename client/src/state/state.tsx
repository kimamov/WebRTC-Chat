import React, { useContext, useReducer, ReactElement, useEffect } from 'react'
import { reducer, Action } from './reducer'
import { Notification } from '../types/types'
import { getUser } from '../api/api'

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
  dispatch: () => { },
})

export const useStateContext = () => useContext(Context)

// check if localStorage has some state otherwise apply default state
const persistentState = (storageKey: string, defaultState: StateContext): StateContext => {
  const data = localStorage.getItem(storageKey);
  if (data) return JSON.parse(data); // if there id data hydrate the default state with it
  return defaultState // otherwise return the normal default state
}

export const StateProvider: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, persistentState('chatState', defaultState))
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('chatState', JSON.stringify(state))
    })

  }, [state])
  useEffect(() => {
    if (true/* state.user && state.user.id */) {
      // get fresh user data on mount if we have a "valid" user object
      (async function refreshUserData() {
        try {
          const response = await getUser();
          const data = await response.json();
          console.log(data)
          dispatch({
            type: 'logIn',
            payload: data
          })
        } catch (error) {
          console.log(error)
          dispatch({
            type: 'logOut'
          })
        }

      })()
    }

  }, [])

  return <Context.Provider value={{ state, dispatch }} children={children} />
}
