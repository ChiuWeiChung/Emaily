import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions/index";

import Header from "./Header";
import Landing from "./Landing";
// actions.fetchUser()
class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
          </div>
          <Switch>
            <Route path="/surveys">Dashboard</Route>
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
