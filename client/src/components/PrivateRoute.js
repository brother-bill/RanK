import React from "react";

import { Route, Redirect } from "react-router-dom";

// Any routes that require you to be logged in will use this private route
class PrivateRoute extends React.Component {
  render() {
    const { component: Component, auth, ...rest } = this.props;
    switch (auth) {
      // Checking if logged in
      case null:
        return <div></div>;
      // Not logged in
      case false:
        return (
          <Route
            {...rest}
            render={(props) =>
              auth === true ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/", state: { from: props.location } }}
                />
              )
            }
          />
        );
      // Logged in
      default:
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
  }
}

export default PrivateRoute;
