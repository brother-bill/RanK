import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Header extends React.Component {
  renderContent() {
    switch (this.props.auth) {
      // Fetching if logged in
      case null:
        return;
      // Not logged in
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      // Logged in
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper blue darken-4">
          <Link
            style={{ left: "5px" }}
            to={this.props.auth ? "/champions" : "/"}
            className="left brand-logo"
          >
            RanK
          </Link>
          <ul className="right">
            <li>
              <ul>{this.renderContent()}</ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
