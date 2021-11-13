import React, { Component, StyleSheet } from "react";
import Nav from "./Nav";

class Not_logged extends Component{
    render(){
        return(
            <React.Fragment>
                <br></br>
                <br></br>
                <br></br>
                <section style={{
                marginLeft: "15%",
                marginRight: "15%",
                padding: "12px 20px",
                borderRadius: "20px",
                alignContent: "center",
                justifyContent: "center"}}
                >
            <img
              src={require("./error.jpg")}
              alt="logo"
              width="100px"
              height="100px"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <h1 style={{
                marginLeft:'auto',
                marginRight:'auto',
                display:'block',
                alignContent:'center',
                textAlign:'center',
                justifyContent:'center',
                fontSize:'250%'
                }}
                >Not Logged In ?</h1>
                </section>
            </React.Fragment>
        );
    }
}
export default Not_logged;