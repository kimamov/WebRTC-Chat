import React, { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useStateContext } from '../state/state'


export interface ProtectedRouteProps extends RouteProps {
  redirectComponent?: React.ComponentType
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
  const { state } = useStateContext()


  if (!state.user || !state.user.id) {
    return <Route {...props} component={props.redirectComponent}/>;
  } else {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;