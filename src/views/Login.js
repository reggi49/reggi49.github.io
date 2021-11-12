import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.props.history.push("/dashboard");
      window.location.reload();
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/dashboard");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-md-5 mx-auto" style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
              <div id="first">
                  <div className="myform form">
                    <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                          <h1>UGC Ecatalog</h1>
                        </div>
                    </div>
                    <Form
                        onSubmit={this.handleLogin}
                        ref={c =>
                        {
                        this.form = c;
                        }}
                        >
                        <div className="form-group">
                          <label>Email address</label>
                          <Input
                              type="text"
                              className="form-control"
                              name="username"
                              value={this.state.username}
                              onChange={this.onChangeUsername}
                              validations={[required]}
                              />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Input
                              type="password"
                              className="form-control"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required]}
                              />                            
                        </div>
                        <div className="card-footer ml-auto mr-auto">
                          <button
                              className="btn btn-block mybtn btn-primary tx-tfm"
                              disabled={this.state.loading}
                              >
                          {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Login</span>
                          </button>
                        </div>
                        {this.state.message && (
                        <div className="form-group" style={{marginTop:15}}>
                          <div className="alert alert-danger" role="alert">
                              {this.state.message}
                          </div>
                        </div>
                        )}
                        <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                        this.checkBtn = c;
                        }}
                        />
                    </Form>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
