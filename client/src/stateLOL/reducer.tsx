import { StateInterface } from './store'

const Reducer = (state: StateInterface, action: any): StateInterface => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'TEST':
      return {
        ...state,
        user: 'passed',
      }
    default:
      return state
  }
}

export default Reducer
