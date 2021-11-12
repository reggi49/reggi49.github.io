import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import PrivateRoute from './utils/PrivateRoute';

import Register from "./components/register.component";
import Profile from "./views/Profile";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Dashboard from "./views/Dashboard";
import Footer from "./components/Footer/Footer";
import Applicant from "./views/Applicant";
import ApplicationId from "./views/ApplicationId";
import Application from "./views/Application";
import Login from "./views/Login";
import Seatmaker from "./views/Seatmaker";
import Home from "./views/Home";

import routes from "./routes.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={""}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <div>
          <Switch>{this.getRoutes(routes)}</Switch>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/mblogin" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/seatmaker/:id" component={Seatmaker} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/applicant" component={Applicant} />
            <PrivateRoute path="/application/:id" component={ApplicationId} />
            <PrivateRoute path="/application" component={Application} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/user" component={BoardUser} />
            <PrivateRoute path="/mod" component={BoardModerator} />
            <PrivateRoute path="/admin" component={BoardAdmin} />
          </Switch>
          <Footer/>
      </div>
    );
  }
}

export default App;
