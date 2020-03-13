import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import ListView from "./pages/ListView";
import RateHistory from "./pages/RateHistory";
import FiveHundred from "./pages/FiveHundred";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid App">
          <Route exact={true} path="/" component={ListView} />
          <Route exact={true} path="/history" component={RateHistory} />
          <Route exact={true} path="/500" component={FiveHundred} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
