import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      // Fetching if logged in
      case null:
        return;
      // Not logged in
      case false:
        return (
          <div className="item">
            <a className="ui blue button inverted" href="/auth/google">
              Login with Google
            </a>
          </div>
        );
      // Logged in
      default:
        return (
          <div className="item">
            <a className="ui red button inverted" href="/api/logout">
              Logout
            </a>
          </div>
        );
    }
  }
  render() {
    return (
      <div className="ui inverted menu">
        <Link to={this.props.auth ? "/listings" : "/"} className="item">
          <Icon name="gamepad" />
          RanK
        </Link>
        <ul className="right inverted menu">
          <li>
            <ul>{this.renderContent()}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(withRouter(Header));
