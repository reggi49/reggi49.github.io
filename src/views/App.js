import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from '../utils/Common';
import routes from "../routes.js";
import http from "../http-common";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    http.get(`/verifyToken?token=${token}`).then(response => {
      console.log('berhasil verify token');
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
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
  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <div className="wrapper">
       <Sidebar routes={routes}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
          />
          <Switch>{getRoutes(routes)}</Switch>
          <Footer />
         </div>
      </div>      
  );
}

export default App;