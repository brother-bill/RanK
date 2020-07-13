import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import ListingsCreate from "./listings/ListingCreate";
import ListingShow from "./listings/ListingShow";
import ListingDelete from "./listings/ListingDelete";
import ListingEdit from "./listings/ListingEdit";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import { ThemeProvider, createGlobalStyle } from "styled-components";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getTheme();
  }

  render() {
    const GlobalStyle = createGlobalStyle`
    body{
      background-color: ${() =>
        this.props.theme === "true" ? "#2e2d2d" : "#EEE"};
      color: ${() => (this.props.theme === "true" ? "#EEE" : "#2e2d2d")}
    }
    `;

    return (
      <ThemeProvider
        theme={{ mode: this.props.theme === "true" ? "dark" : "light" }}
      >
        <React.Fragment>
          <GlobalStyle />
          <Router history={history}>
            <div className="ui container inverted">
              <Header />
              <Route exact path="/" component={Landing} />
              <PrivateRoute
                auth={this.props.auth}
                exact
                path="/listings"
                component={Dashboard}
              />

              <PrivateRoute
                auth={this.props.auth}
                exact
                path="/listings/new"
                component={ListingsCreate}
              />
              <PrivateRoute
                auth={this.props.auth}
                exact
                path="/listings/show/:id"
                component={ListingShow}
              />
              <PrivateRoute
                auth={this.props.auth}
                exact
                path="/listings/delete/:id"
                component={ListingDelete}
              />
              <PrivateRoute
                auth={this.props.auth}
                exact
                path="/listings/edit/:id"
                component={ListingEdit}
              />
            </div>
          </Router>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    theme: state.theme,
  };
}
export default connect(mapStateToProps, actions)(App);
