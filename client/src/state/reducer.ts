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
  | { type: 'logIn'; payload: any }
  | { type: ActionType.SIGN_OUT }
  | { type: 'toggleDark' }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case ActionType.ADD_CONTACT:
      return { ...state, contacts: state.contacts.concat(action.payload) }
    case ActionType.REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id === action.payload.id),
      }
    case 'logIn':
      return { ...state, user: action.payload }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    case 'toggleDark':
      return { ...state, darkMode: !state.darkMode }
    default:
      throw new Error('Not among actions')
  }
}
