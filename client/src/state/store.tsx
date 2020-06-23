import React, { useReducer, createContext, ReactElement } from 'react'
import reducer from './reducer'

interface Props {
  children: ReactElement
}
interface StateInterface {
  user: {}
}

const initialState: StateInterface = {
  user: {},
}

const Store = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  )
}

export const Context = createContext(initialState)
export default Store
