export interface Notification {
  type: 'snackbar' | 'dialog'
  alertType: 'success' | 'error'
  message: string
}
