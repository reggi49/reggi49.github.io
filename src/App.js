import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Footer from "./components/Footer/Footer";
import Home from "./views/Home";

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default App;
