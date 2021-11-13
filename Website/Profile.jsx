import React, { Component, StyleSheet } from "react";
import Nav from "./Nav";
import Not_logged from "./Not_logged";
import Char from "./Chat";
import { Link, Redirect, withRouter } from "react-router-dom";
import {Alert} from 'react-bootstrap';
import Chat from "./Chat";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {logged:'in',img:'f'};
    if(localStorage.login_response=="Successfully logged-in!!!"){
      fetch("http://5.181.217.131:5000/fetchdet", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email : localStorage.details_user
        }),
      })
        .then((response) => response.json())
        .then((datares) => {
          document.getElementById("name").innerHTML = " "+datares.fname+" "+datares.lname;
          document.getElementById("res.email").innerHTML = " "+datares.email;
          document.getElementById("res.about").innerHTML = " "+datares.about;
          document.getElementById("res.q1").innerHTML = " "+datares.q1;
          document.getElementById("res.q2").innerHTML = " "+datares.q2;
          document.getElementById("res.q3").innerHTML = " "+datares.q3;
          document.getElementById("res.q4").innerHTML = " "+datares.q4;
          //Do anything else like Toast etc.
        });
    }
  }
  componentDidMount(){
    if(localStorage.login_response=="Successfully logged-in!!!"){
      fetch("http://5.181.217.131:5000/getImage", {
        mode:'cors',
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email : localStorage.details_user
        }),
      })
        .then((response) => response.blob())
        .then((data) => {
          var outside = URL.createObjectURL(data);
          var prof_pic = document.getElementById("profile");
          prof_pic.src = outside;
        });
    }
  }
  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
  log_out =(e)=>{
    localStorage.login_response = "logged-out";
    this.setState({logged:'out'});
    localStorage.chat_c = "logged-out";
    localStorage.chat_g = "logged-out";
  }
  render() {
    if(localStorage.login_response!="Successfully logged-in!!!"){
      return(
      <React.Fragment>
        <Nav></Nav>
        <br></br>
        <br></br>
        <br></br>
        <section
        style={{
          backgroundColor:'white',
          marginLeft: "15%",
          marginRight: "15%",
          padding: "12px 20px",
          borderRadius: "20px",
          alignContent: "center",
          justifyContent: "center"
        }}
        >
        <Not_logged/>
        <Alert variant="danger" style={{fontSize:'150%'}}>To view your profile, you need to <Link to='/' style={{color:'red'}}>Log-In</Link></Alert>
        </section>
      </React.Fragment>
      );
    }
    else{
      return (
        <React.Fragment>
          <Nav></Nav>
          <br></br>
          <br></br>
          <br></br>
          <section
            style={{
              backgroundColor: "white",
              marginLeft: "10%",
              marginRight: "10%",
              borderRadius: "20px",
              opacity:'0.8'
            }}
          >
            <br></br>
            <button style={{marginLeft:'70%',backgroundColor:'#2c3531',color:'white',fontSize:'150%',borderRadius:'20px'}}
            onClick={this.log_out}
            >
              Log-Out
            </button>
            <Profile_pic></Profile_pic>
            <User_details></User_details>
          </section>
        </React.Fragment>
      );
    }
  }
}
class Profile_pic extends Component {
  render() {
    return (
      <React.Fragment>
        <img
          src="https://th.bing.com/th/id/OIP.TouNZxZ6zY-HetqfYQ1GHQD6D6?pid=Api&rs=1"
          id="profile"
          style={{
            width: "200px",
            height: "200px",
            overflow: "hidden",
            borderRadius: "50%",
           // marginLeft: "42%",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            opacity:'1'
          }}
        ></img>
      </React.Fragment>
    );
  }
}
class User_details extends Component {
  render() {
    return (
      <React.Fragment>
        <label style={titles}>Name: </label>
        <label id="name" style={lables}></label>
        <br></br>
        <br></br>
        <label style={titles}>Email: </label>
        <label id="res.email" style={lables}></label>
        <br></br>
        <br></br>
        <label style={titles}>About:</label>
        <br></br>
        <label id="res.about" style={{fontStyle:'italic',marginLeft:'10%'}}></label>
        <br></br>
        <br></br>
        <section >
          <p style={titles}>Q1: What motivates you to get out of bed each morning?</p>
        <p style={{marginLeft:'13%'}} id="res.q1"></p>
        <p style={titles}>Q2: What is a cause you are really passionate about?</p>
        <p style={{marginLeft:'13%'}} id="res.q2"></p>
        <p style={titles}>Q3: What is your favourite kind of vacation?</p>
        <p style={{marginLeft:'13%'}} id="res.q3"></p>
        <p style={titles}>Q4: What is your favourite embarassing story?</p>
        <p style={{marginLeft:'13%'}} id="res.q4"></p>
        <br></br>
        </section>
      </React.Fragment>
    );
  }
}
const titles = {
  marginLeft: "10%",
  marginRight:"auto",
  fontSize:'150%',
  fontStyle:"italic",
  fontWeight:'bold',
  color:'#363636',
  textAlign:'justify'
};
const lables = {
  fontSize : '150%'
}
export default Profile;
