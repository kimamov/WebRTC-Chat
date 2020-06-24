import React, {
  useReducer,
  createContext,
  ReactElement,
  useContext,
} from 'react'
import reducer from './reducer'

interface Props {
  children: ReactElement
}
export interface StateInterface {
  user: {}
  darkMode: boolean
}

export interface ContextInterface {
  state: StateInterface
  dispatch?: React.Dispatch<{ type: string; payload?: any }>
}

const initialState: StateInterface = {
  user: {},
  darkMode: false,
}

const Store = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const Context = createContext<ContextInterface>({ state: initialState })
export const useStateContext = () => useContext(Context)
export default Store
