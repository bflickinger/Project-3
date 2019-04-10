import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import * as Hexa from "./hexa";

class Activegame extends Component {
    state = {
        board: [],
        playBtn: "",
        turn: "",
        memory: [],
        lastMove: { brd: "", mvi: 0},
        clicks : {first: null, second: null},
        win: { c: 0, p: 0 },
        score: ""
    }

componentDidMount = () => {
    Hexa.createBtns();
    Hexa.restart();
    // console.log("didmount memory",Hexa.memory);
};

// createBtns = () => {
//     // console.log('createBtns has been called');
//     let b, d = document.createElement("div"), v = false, x = document.getElementById("hexa");
//     // console.log("hexa :",x);
//     d.className += "board";
//     x.appendChild(d);
//     for (let j = 0; j < 3; j++) {
//         for (let i = 0; i < 3; i++) {
//             b = document.createElement("button");
//             b.id = "btn" + (i + j * 3);
//             b.i = i; b.j = j;
//             b.addEventListener("click", btnHandle, false);
//             b.appendChild(document.createTextNode(""));
//             d.appendChild(b);
//             if (v) b.className = "button"
//             else b.className = "empty";
//             v = !v;
//         }
//     }
//     playBtn = document.createElement("button");
//     playBtn.className = "button long hide";
//     playBtn.addEventListener("click", restart, false);
//     score = document.createElement("p");
//     score.className = "txt";
//     d.appendChild(score);
//     d.appendChild(playBtn);
//     updateScore();
// }

render() {

    // const { user } = this.props.auth;
    return (
        <div id="hexa" className="col s6 blue" style={{ minHeight: "88vh", paddingTop: "50px" }}>
            {/* <h1 style={{ color: "white", textAlign: "center", minHeight: "75vh" }}>LEFT</h1> */}
        </div>
    );
}
}

Activegame.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Activegame);