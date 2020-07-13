import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { fetchUser, changeTheme } from "../actions";

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  renderContent() {
    let color = this.props.theme === "true" ? "blue" : "grey";
    switch (this.props.auth) {
      // Fetching if logged in
      case null:
        return;
      // Not logged in
      case false:
        return (
          <React.Fragment>
            <div className="item">
              <a
                className={`ui ${color} button inverted`}
                onClick={() => {
                  this.props.changeTheme();
                }}
              >
                Theme
              </a>
            </div>
            <div className="item">
              <a className={"ui blue button inverted"} href="/auth/google">
                Login with Google
              </a>
            </div>
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <div className="item">
              <a
                className={`ui ${color} button inverted`}
                onClick={() => {
                  this.props.changeTheme();
                }}
              >
                Theme
              </a>
            </div>
            <div className="item">
              <a className="ui red button inverted" href="/api/logout">
                Logout
              </a>
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
