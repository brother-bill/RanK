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
// <Header />
//<Route path="/champions/new" exact component={ChampionsNew} />
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
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
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(App);
