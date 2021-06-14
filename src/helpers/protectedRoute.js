import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          );
        }
        return null;
      }}
    />
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};
