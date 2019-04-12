import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";

class Rightside extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {

        // const { user } = this.props.auth;

        return (
                <div id="rightside-col" className="col s6">
                    {/* <h1 style={{color:"white",textAlign:"center", minHeight:"75vh"}}>RIGHT</h1> */}
                </div>
        );
    }
}

Rightside.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Rightside);