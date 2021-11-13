import React, { Component, StyleSheet } from "react";
import { Link } from "react-router-dom";
import { Badge, Button,Alert} from 'react-bootstrap';
class Nav extends React.Component {
  meet = () => {
    alert("Feature Coming Soon!");
  };
  render() {
    const styles = {
      display: "inline",
      color: "black",
      cursor: "pointer",
    };
    const menu_button={
      backgroundColor:'yellow',
      width:'5em',
      color:'#2c3531',
      fontSize :'80%',
      borderRadius: '20px',
      padding: '5px 0px',
      borderRadiusColor:'#D1e8e2',
      fontStyle:'italic',
      fontWeight:'bold',
      
    }
    const space_style = {
      display: "inline",
      color: "#2c3531",
    };
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#2c3531",
            top: "0px",
            position:'abosulte',
            right: "0px",
            left: "0px",
            width: "100%",
            padding:'5px ',
            opacity:'0.85'
          }}
        >
          <ul>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li style={styles} class="nav">
                <button  style={menu_button} >Home</button>
              </li>
            </Link>
            <li style={space_style}> </li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <li style={styles} class="nav">
              <button style={menu_button}>Profile</button>
              </li>
            </Link>
            <li style={space_style}> </li>
            <Link to="/chat" style={{ textDecoration: "none" }}>
              <li style={styles} class="nav">
              <button style={menu_button}>Chat</button>
              </li>
            </Link>
            <li style={space_style}> </li>
            <li style={styles} class="nav" onClick={this.meet}>
             <button style={menu_button}>Meeting</button>
            </li>
            <li style={space_style}> </li>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <li style={styles} class="nav">
               <button style={menu_button}>About</button>
              </li>
            </Link>
          </ul>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
export default Nav;
