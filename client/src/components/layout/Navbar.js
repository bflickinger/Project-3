import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Buttoncontrol from "./Buttoncontrol";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log("User? ", user);
    return (
      <div className="navbar-fixed">
      {/* {console.log("navbar props",this.props)} */}
      {/* {console.log("navbar props from login",this.props.location)} */}
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            {console.log("are we authenticated? ",this.props.auth.isAuthenticated)}
            <b style={{color:"black",marginLeft: "5px"}}>{this.props.auth.isAuthenticated ? "Welcome, " + user.name.split(" ")[0]:null} </b>
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">code</i>
              Hexapawn
            </Link>
            <Buttoncontrol location={this.props.location} history={this.props.history}/>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

