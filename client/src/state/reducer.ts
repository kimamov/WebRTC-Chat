import { StateContext } from './state'
import { IContact } from './Contact'

export enum ActionType {
  ADD_CONTACT = 'Add contact',
  REMOVE_CONTACT = 'Remove contact',
  SIGN_IN = 'signIn',
  SIGN_OUT = 'Sign out',
}

export type Action =
  | { type: ActionType.ADD_CONTACT; payload: IContact }
  | { type: ActionType.REMOVE_CONTACT; payload: IContact }
  | { type: 'signIn' }
  | { type: ActionType.SIGN_OUT }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_CONTACT:
      return { ...state, contacts: state.contacts.concat(action.payload) }
    case ActionType.REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id === action.payload.id),
      }
    case 'signIn':
      return { ...state, isAuthenticated: true }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    default:
      throw new Error('Not among actions')
  }
}
