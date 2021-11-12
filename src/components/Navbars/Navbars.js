import React, { Component } from "react";
import { Navbar, NavItem, Nav, NavDropdown, MenuItem} from "react-bootstrap";

class Navbars extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  logOut() {
    localStorage.removeItem("user");
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{"E-Catalog"}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <div>
            <Nav pullRight>
              <NavDropdown
              eventKey={2}
              title="Profile"
              id="basic-nav-dropdown-right"
              >
              <MenuItem eventKey={2.1} href="/profile" >Update Profile</MenuItem>
              </NavDropdown>
              <NavItem eventKey={2} href="/" onClick={this.logOut}>
                Log out
              </NavItem>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navbars;
