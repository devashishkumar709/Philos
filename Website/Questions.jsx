import React, { Component } from "react";
import { Link } from "react-router-dom";
class Questions extends React.Component {
  constructor(props) {
    super(props);
    sessionStorage.previous = "hi";
  }
   getLocation=()=> {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.getLatLon);
        } 
        else {
          var x = document.getElementById("incomplete");
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
   getLatLon=(position)=> {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        localStorage.latitude = latitude ;
        localStorage.longitude = longitude ;
      }
  select_change = (e) => {
    this.handleChange(e);
   // var change = document.getElementById("done").value;
    this.setState({ move_next: "change" });
  };
  handleChange = function (e) {
    var q1 = document.getElementById("q1").value;
    q1 = q1.trim();
    var q2 = document.getElementById("q2").value;
    q2 = q2.trim();
    var q3 = document.getElementById("q3").value;
    q3 = q3.trim();
    var q4 = document.getElementById("q4").value;
    q4 = q4.trim();
    var profession = document.getElementById("p").value;
    if(q1==""||q2==""||q3==""||q4==""||localStorage.latitude===null||localStorage.longitude===null){
      document.getElementById("incomplete").innerHTML = "You can't leave the form incomplete. Also make sure you have granted location access Kindly fill the form comletely to proceed to the next page."
      localStorage.previous = "i";
      this.setState({move_next:'change'})
    }
    else{
      this.getLocation();
      var data = {
      fname: localStorage.fname,
      lname: localStorage.lname,
      age: localStorage.age,
      email: localStorage.email,
      phone: localStorage.pno,
      about: localStorage.about,
      password: localStorage.pass,
      profession: profession,
      lat:localStorage.latitude,
      lng : localStorage.longitude,
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
    };
    console.log(data);
      fetch("http://5.181.217.131:5000", {
        mode: "cors",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname: data.fname,
          lname: data.lname,
          age: data.age,
          pno: data.phone,
          email: data.email,
          about: data.about,
          password: data.password,
          lat: data.lat,
          lng: data.lng,
          q1 : data.q1 ,
          q2 : data.q2 ,
          q3 : data.q3 ,
          q4 : data.q4,
          profession : data.profession
        }),
      })
        .then((response) => response.json())
        .then((datares) => {
          window.alert(datares);
          //Do anything else like Toast etc.
        });
    localStorage.previous = "n";}
  };
  loadFile = (event) => {
    var image = document.getElementById("profile");
    image.src = URL.createObjectURL(event.target.files[0]);
      const fd = new FormData();
      fd.append('myFile',event.target.files[0],localStorage.email+".jpg");
      fetch('http://5.181.217.131:5000/saveImage',{
        method:'POST',
        body:fd
      })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  };
  // componentDidMount(){
  //    const input = document.getElementById("prof_pic");
  //   input.addEventListener('change',()=>{
  //     uploadFile(input.files[0]);
  //     console.log(URL.createObjectURL(input.files[0]));
  //   });
  //   const uploadFile = (file) =>{
  //     console.log(URL.createObjectURL(file));
  //     const fd = new FormData();
  //     fd.append('avatar',input.files[0],'prof');
  //     fetch('http://5.181.217.131:5000/saveImage',{
  //       method:'POST',
  //       body:fd
  //     })
  //     .then(res => res.json())
  //     .then(json => console.log(json))
  //     .catch(err => console.error(err));
  //   }
  // }
  render() {
    if (localStorage.previous == "n") {
      return (
        <React.Fragment>
          <br></br>
          <br></br>
          <section
            style={{
              backgroundColor: "white",
              marginLeft: "15%",
              marginRight: "15%",
              padding: "12px 20px",
              borderRadius: "20px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                justifyContent: "center",
                alignContent: "center",
                marginLeft: "8%",
                fontSize: "150%",
              }}
            >
              <b>Thank You for creating your Phios account !</b>
            </p>
            <p
              style={{
                justifyContent: "center",
                alignContent: "center",
                marginLeft: "8%",
                fontSize: "120%",
              }}
            >
              Your data has now been <u>saved</u> and you will be <u>redirected</u> to the
              home page. Your are requested to not-violate our Terms & Conditions and must go through our Privacy Policy.
            </p>
            <br></br>
            <br></br>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  borderRadius: "20px",
                  width: "30%",
                  backgroundColor: "#88bdbc",
                  fontSize: "150%",
                }}
              >
                Okay
              </button>
            </Link>
          </section>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1 style={{ marginLeft: "10%",color:'#FFCF43'}}>
            Select a Profile Picture and answer some basic Questions about
            yourself:
          </h1>
          <section
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              margin: "auto",
              alignContent: "center",
              marginRight: "10%",
              marginLeft: "10%",
              padding: "12px 20px",
            }}
          >
            <h2 style={{ marginLeft: "50px", marginRight: "50px" }}>
              Select a Profile Picture:
            </h2>
            <img
              src="https://th.bing.com/th/id/OIP.TouNZxZ6zY-HetqfYQ1GHQD6D6?pid=Api&rs=1"
              id="profile"
              style={{
                width: "200px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "50%",
                marginLeft: "50px",
              }}
            ></img>
            <br></br>
            <input
              id = "prof_pic"
              type="file"
              onChange={this.loadFile}
              name="myImage"
              accept="image/*"
              style={{
                marginLeft: "5%",
                border: "1px solid #ccc",
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            />
            <br></br>
            <form /*onSubmit={this.select_change}*/>
              <Ques></Ques>
              <br></br>
              <button
                type="button"
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  marginLeft: "41%",
                  marginRight: "45%",
                  borderRadius: "20px",
                  backgroundColor: " #88bdbc",
                  fontSize: "150%",
                }}
                onClick={this.select_change}
              >
                Submit
              </button>
            </form>
            <br></br>
            <Link to="/">
              <button
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  marginLeft: "41%",
                  borderRadius: "20px",
                  backgroundColor: "red",
                  fontSize: "150%",
                }}
              >
                Cancel
              </button>
            </Link>
          </section>
        </React.Fragment>
      );
    }
  }
}
class Ques extends React.Component {
  render() {
    return (
      <div>
        <h3
          style={{ textAlign: "left", marginLeft: "50px", marginRight: "50px" }}
        >
          Q1: What motivates you to get out of bed each morning?
        </h3>
        <textarea
          required
          maxLength = "100"
          style={{
            width: "90%",
            resize: "none",
            alignItems: "center",
            alignContent: "center",
            marginLeft: "5%",
          }}
          id="q1"
        ></textarea>
        <h3
          style={{ textAlign: "left", marginLeft: "50px", marginRight: "50px" }}
        >
          Q2: What is a cause you are really passionate about?
        </h3>
        <textarea
          required
          maxLength="100"
          style={{
            width: "90%",
            resize: "none",
            alignItems: "center",
            alignContent: "center",
            marginLeft: "5%",
          }}
          id="q2"
        ></textarea>
        <h3
          style={{ textAlign: "left", marginLeft: "50px", marginRight: "50px" }}
        >
          Q3: What is your favourite kind of vacation?
        </h3>
        <textarea
          required
          maxLength="100"
          style={{
            width: "90%",
            resize: "none",
            alignItems: "center",
            alignContent: "center",
            marginLeft: "5%",
          }}
          id="q3"
        ></textarea>
        <h3
          style={{ textAlign: "left", marginLeft: "50px", marginRight: "50px" }}
        >
          Q4: What is your favourite embarassing story?
        </h3>
        <textarea
          required
          maxLength = "100"
          style={{
            width: "90%",
            resize: "none",
            alignItems: "center",
            alignContent: "center",
            marginLeft: "5%",
          }}
          id="q4"
        ></textarea>
        <DropDown></DropDown>
        <h4 id='incomplete' style={{color:'red',marginLeft:'50px',marginRight:'50px'}}></h4>
      </div>
    );
  }
}
class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.select_profession = this.select_profession.bind(this);
    this.state = {
      jobs: "",
      study: "",
      change: false,
    };
  }
  select_profession = (e) => {
    var change = document.getElementById("student").value;
    this.setState({ jobs: change });
    var input = document.getElementById("student");
    input.checked = false;
  };
  render() {
    if (this.state.jobs != "STD") {
      return (
        <React.Fragment>
          <h4 style={{ textAlign: "left", marginLeft: "50px" }}>
            Select you Profession:
          </h4>
          <select
            id="p"
            style={{ alignContent: "center", marginLeft: "50px" }}
            onChange={this.urp}
          >
            <option value="0">Engineer</option>
            <option value="1">Medical Science</option>
          </select>
          <br></br>
          <input
            onChange={this.select_profession}
            type="checkbox"
            name="student"
            id="student"
            value="STD"
            style={{ alignContent: "center", marginLeft: "50px" }}
          ></input>
          <label>Student?</label>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h4 style={{ textAlign: "left", marginLeft: "50px" }}>
            Select your field of study:
          </h4>
          <select
            id="p"
            style={{ alignContent: "center", marginLeft: "50px" }}
          >
            <option value="2">Commerce</option>
            <option value="3">Music</option>
          </select>
          <br></br>
          <input
            onChange={this.select_profession}
            type="checkbox"
            name="student"
            id="student"
            value="PROF"
            style={{ alignContent: "center", marginLeft: "50px" }}
          ></input>
          <label>Professional?</label>
        </React.Fragment>
      );
    }
  }
}
export default Questions;