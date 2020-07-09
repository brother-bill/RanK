import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import ListingsForm from "./listings/ListingsForm";
// <Header />
//<Route path="/champions/new" exact component={ChampionsNew} />
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="ui container inverted">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/listings" component={Dashboard} />
          <Route path="/listings/new" component={ListingsForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
