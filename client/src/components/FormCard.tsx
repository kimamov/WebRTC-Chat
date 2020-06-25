import { Card } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export default styled(Card)(({ theme }) => ({
  display: 'inline-flex',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}))
