import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu, Button } from "semantic-ui-react";
import { fetchUser, changeTheme } from "../actions";

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderContent() {
    let color = this.props.theme === "true" ? "yellow" : "green";
    switch (this.props.auth) {
      // Fetching if logged in
      case null:
        return;
      // Not logged in
      case false:
        return (
          <React.Fragment>
            <div className="item">
              <Button
                basic
                color={color}
                onClick={() => {
                  this.props.changeTheme();
                }}
              >
                Theme
              </Button>
            </div>
            <div className="item">
              <Button className="ui blue button inverted" href="/auth/google">
                Login with Google
              </Button>
            </div>
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <div className="item">
              <Button
                basic
                color={color}
                onClick={(e) => {
                  this.props.changeTheme();
                }}
              >
                Theme
              </Button>
            </div>
            <div className="item">
              <Button className="ui red button inverted" href="/api/logout">
                Logout
              </Button>
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <Menu color="black" inverted>
        <Link to={this.props.auth ? "/listings" : "/"} className="item">
          <Icon name="gamepad" />
          RanK
        </Link>
        <Menu.Menu position="right">{this.renderContent()}</Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, theme: state.theme };
}
export default connect(mapStateToProps, { fetchUser, changeTheme })(
  withRouter(Header)
);
