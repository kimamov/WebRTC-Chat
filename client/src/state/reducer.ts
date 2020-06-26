import { StateContext } from './state'
import { Notification } from '../types/types'

export enum ActionType {
  ADD_CONTACT = 'Add contact',
  REMOVE_CONTACT = 'Remove contact',
  SIGN_IN = 'signIn',
  SIGN_OUT = 'Sign out',
}

export type Action =
  | { type: 'logIn'; payload: any }
  | { type: ActionType.SIGN_OUT }
  | { type: 'toggleDark' }
  | { type: 'createNotification'; payload: Notification }
  | { type: 'deleteNotification' }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    case 'logIn':
      return { ...state, user: action.payload }
    case ActionType.SIGN_OUT:
      return { ...state, isAuthenticated: false }
    case 'toggleDark':
      return { ...state, darkMode: !state.darkMode }
    case 'createNotification':
      return { ...state, notification: action.payload }
    case 'deleteNotification':
      return { ...state, notification: null }
    default:
      throw new Error('Not among actions')
  }
}
