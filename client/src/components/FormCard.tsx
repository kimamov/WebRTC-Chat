import { Card } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export default styled(Card)(({ theme }) => ({
  display: 'inline-block',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  margin: 'auto',
  width: '34rem',
  maxWidth: '100%'
}))
