import React, { Component, StyleSheet } from 'react';
import Questions from './Questions';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
class Sign_up extends React.Component {
	state = { cancel: false };
	render() {
		return (
			<React.Fragment>
				<br />
				<h1 style={{ marginLeft: '10%', color: '#FFCF43' }}>Fill in the required details:</h1>
				<section
					style={{
						backgroundColor: 'white',
						marginLeft: '10%',
						marginRight: '10%',
						padding: '12px 20px',
						borderRadius: '10px'
					}}
				>
					<Details />
					<br />
					<Link to="/" style={{ textDecoration: 'none' }}>
						<Badge
							variant="danger"
							style={{
								display: 'block',
								width: '30%',
								fontSize: '150%',
								alignContent: 'center',
								marginLeft: 'auto',
								marginRight: 'auto',
								textAlign: 'center'
							}}
						>
							Cancel
						</Badge>
					</Link>
				</section>
				<br />
				<br />
			</React.Fragment>
		);
	}
}
class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = { move_next: 'False' };
	}
	select_change = (e) => {
		this.handleChange();
		var change = document.getElementById('done').value;
		this.setState({ move_next: change });
	};
	handleChange = function(e) {
		var fname = document.getElementById('Fname').value;
		fname = fname.trim();
		localStorage.fname = fname;
		var lname = document.getElementById('Lname').value;
		lname = lname.trim();
		localStorage.lname = lname;
		var age = document.getElementById('age').value;
		localStorage.age = age;
		var email = document.getElementById('email').value;
		email = email.trim();
		localStorage.email = email;
		let s = email.split(''); // split email to characters
		for (let i in s) {
			if (s[i] == '@') {
				sessionStorage.true_email = 'correct';
			}
		}
		var pno = document.getElementById('pno').value;
		pno = pno.trim();
		localStorage.pno = pno;
		var about = document.getElementById('about').value;
		localStorage.about = about;
		var pass = document.getElementById('pass').value;
		localStorage.pass = pass;
		var rpass = document.getElementById('rpass').value;
		if (fname == '' || lname == '' || pno == '' || email == '') {
			alert("You can't leave the form incomplete");
			document.getElementById('done').value = 'False';
			var done = document.getElementById('done');
			done.checked = false;
		} else if (age < 18) {
			alert('Sorry! You do not meet our age criteria and therefore you are requested to close this site now!');
			document.getElementById('done').value = 'False';
			var done = document.getElementById('done');
			done.checked = false;
		} else if (rpass != pass || pass == '') {
			alert("Password doesn't match");
			document.getElementById('done').value = 'False';
			var done = document.getElementById('done');
			done.checked = false;
		} else if (sessionStorage.true_email != 'correct') {
			alert('Incorrect Email Address!');
			document.getElementById('done').value = 'False';
			var done = document.getElementById('done');
			done.checked = false;
		} else {
			localStorage.previous = 'incomplete'; //questions page requirement
		}
	};
	render() {
		if (this.state.move_next == 'False') {
			return (
				<React.Fragment>
					<form onSubmit={this.handleChange}>
						<fieldset
							style={{
								backgroundColor: 'white',
								alignContent: 'center',
								justifyContent: 'center',
								borderRadius: '20px'
							}}
						>
							<legend style={{ fontSize: '150%' }}>
								<b>Personal Information:</b>
							</legend>
							<label>
								<b>First Name:</b>
							</label>
							<br />
							<input
								id="Fname"
								type="text"
								required
								style={{
									width: '55%',
									borderRadius: '5px',
									fontSize: '150%'
								}}
							/>
							<br />
							<label>
								<b>Last Name:</b>
							</label>
							<br />
							<input
								id="Lname"
								type="text"
								required
								style={{ width: '55%', borderRadius: '5px', fontSize: '150%' }}
							/>
							<br />
							<label>
								<b>Age:</b>
							</label>
							<br />
							<input
								id="age"
								type="number"
								required
								style={{ width: '35%', borderRadius: '5px', fontSize: '150%' }}
							/>
							<text style={{ color: 'red', marginLeft: '1%' }}>
								(You need to be 18 or above to use our services)
							</text>
							<br />
							<label>
								<b>Phone No:</b>
							</label>
							<br />
							<input
								id="pno"
								type="phone"
								placeholder="(+91)"
								required
								style={{ width: '55%', borderRadius: '5px', fontSize: '150%' }}
							/>
						</fieldset>
						<br />
						<br />
						<fieldset
							style={{
								backgroundColor: 'white',
								alignContent: 'center',
								justifyContent: 'center',
								borderRadius: '20px'
							}}
						>
							<legend style={{ fontSize: '150%' }}>
								<b>Choose:</b>
							</legend>
							<label>
								<b>Email Adress:</b>
							</label>
							<br />
							<input
								id="email"
								type="email"
								placeholder="email@example.com"
								required
								style={{ width: '55%', borderRadius: '5px', fontSize: '110%' }}
							/>
							<br />
							<label>
								<b>Password:</b>
							</label>
							<br />
							<input
								id="pass"
								type="password"
								required
								style={{ width: '35%', borderRadius: '5px', fontSize: '110%' }}
							/>
							<br />
							<label>
								<b>Re-Enter Password:</b>
							</label>
							<br />
							<input
								id="rpass"
								type="password"
								required
								style={{ width: '35%', borderRadius: '5px', fontSize: '110%' }}
							/>
						</fieldset>

						<br />
						<br />
						<label>
							<b>Tell us something about yourself:</b>{' '}
						</label>
						<br />
						<textarea
							id="about"
							rows="10"
							style={{
								resize: 'none',
								width: '99%',
								borderRadius: '20px',
								alignContent: 'center',
								justifyContent: 'center'
							}}
						/>
						<br />
						<input onChange={this.select_change} type="checkbox" name="student" id="done" value="True" />
						<label style={{ fontStyle: 'italic', fontSize: '120%' }}>
							<b>
								All Information provided by me is true to my knowlegde and I accept all the T&C (
								<u>once you check the box, the form gets submitted</u>)
							</b>
						</label>
					</form>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<h1>Great Work! Only a few more steps left</h1>
					<Link to="/questions" style={{ textDecoration: 'none' }}>
						<button
							type="submit"
							style={{
								textAlign: 'center',
								alignContent: 'center',
								marginLeft: 'auto',
								marginRight: 'auto',
								display: 'block',
								borderRadius: '20px',
								width: '30%',
								backgroundColor: '#88bdbc',
								fontSize: '150%'
							}}
						>
							Next
						</button>
					</Link>
				</React.Fragment>
			);
		}
	}
}
export default Sign_up;
