import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import Navbars from "../components/Navbars/Navbars";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes.js";
import mbtechlogo from "../assets/img/MBtech-Logo.png";
 

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
    <div className="wrapper">
      <Sidebar {...this.props} routes={routes}/>
      <div id="main-panel" className="main-panel" ref="mainPanel">
        <Navbars/>
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={8}>
                  <Card
                    title="Profile"
                    content={
                      <form>
                        <FormInputs
                          ncols={["col-md-6", "col-md-6"]}
                          properties={[
                            {
                              label: "Username",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Username",
                              defaultValue: currentUser.username,
                            },
                            {
                              label: "Email address",
                              type: "email",
                              bsClass: "form-control",
                              placeholder: "Email",
                              defaultValue: currentUser.email,
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-12"]}
                          properties={[
                            {
                              label: "Password",
                              type: "password",
                              bsClass: "form-control",
                              placeholder: "Password",
                              defaultValue: "Password"
                            }
                          ]}
                        />
                        <Button bsStyle="info" pullRight fill type="submit">
                          Profile
                        </Button>
                        <div className="clearfix" />
                      </form>
                    }
                  />
                </Col>
                <Col md={4}>
                    <Card
                    // title="Edit Profile"
                    content={
                      <div className="image">
                        <img height="100%" 
                        // {"http://mbtech.info/newoffice/images/"+seatmaker.gambar}
                        src={mbtechlogo} 
                        />
                      </div>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>
      </div>
    </div>   
    );
  }
}
