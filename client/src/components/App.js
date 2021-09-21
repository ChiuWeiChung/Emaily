import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../actions/index";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

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
            <Switch>
              <Route path="/surveys/new" component={SurveyNew} />
              <Route path="/surveys" component={Dashboard} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
