import React from "react";

import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, auth, ...rest } = this.props;
    switch (auth) {
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
