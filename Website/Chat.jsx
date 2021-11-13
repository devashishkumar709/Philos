import React, { Component, StyleSheet } from 'react';
import Nav from './Nav';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Not_logged from './Not_logged';
import { Alert } from 'react-bootstrap';
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {print:'false',date:'no',grp:'',created:'',render:false,};
		if (localStorage.login_response == 'Successfully logged-in!!!') {
			fetch('http://5.181.217.131:5000/chatinit', {
				mode: 'cors',
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: localStorage.loggedin_user
				})
			})
				.then((response) => response.json())
				.then((datares) => {
					this.setState({grp:datares.grp_id});
					this.setState({created:datares.created});
					localStorage.chat_g = datares.grp_id;
					localStorage.chat_c = datares.created;
				});
		}
		this.getchat();
	}
	
getchat = ()=> {
	if (localStorage.login_response == 'Successfully logged-in!!!') {
			fetch('http://5.181.217.131:5000/getchat', {
				mode: 'cors',
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					grp_id: localStorage.chat_g,
					created: localStorage.chat_c
				})
			})
				.then((response) => response.json())
				.then((datares) => {
					for (var i in datares) {
						var messages = document.getElementById('messages');
						var new_email = document.createElement('li');
						var new_message = document.createElement('li');
						var new_dt = document.createElement('li');
						new_email.innerHTML = datares[i]['email'];
						new_email.style.fontWeight = "bold";
						new_message.innerHTML = datares[i]['message'];
						new_dt.innerHTML = datares[i]['dt'];
						var dash = document.createElement('li');
						dash.innerHTML = '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _';
						if (datares[i]["email"] == localStorage.details_user) {
							new_email.style.color = "green";
						}
						messages.appendChild(new_email);
						messages.appendChild(new_message);
						messages.appendChild(new_dt);
						messages.appendChild(dash);
					}
				});
		}
}
	render() {
		if (localStorage.login_response != 'Successfully logged-in!!!') {
			return (
				<React.Fragment>
					<Nav />
					<br />
					<br />
					<br />
					<section
						style={{
							backgroundColor: 'white',
							marginLeft: '15%',
							marginRight: '15%',
							padding: '12px 20px',
							borderRadius: '20px',
							alignContent: 'center',
							justifyContent: 'center'
						}}
					>
						<Not_logged />
						<Alert variant="danger" style={{ fontSize: '150%' }}>
							To chat with other users, you need to{' '}
							<Link to="/" style={{ color: 'red' }}>
								Log-In
							</Link>
						</Alert>
					</section>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Nav />
					<br />
					<List_button />
					<br />
					<Chat_box />
				</React.Fragment>
			);
		}
	}
}
class List_button extends Component {
	constructor(props) {
		super(props);
		this.state = { members: 'closed' };
	}
	open = (e) => {
		if ((this.state.members = 'closed')) {
			this.setState({ members: 'open' });
			if (localStorage.login_response == 'Successfully logged-in!!!') {
				fetch('http://5.181.217.131:5000/getmembers', {
					mode: 'cors',
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						grp_id: localStorage.chat_g,
						created: localStorage.chat_c
					})
				})
					.then((response) => response.json())
					.then((datares) => {
						for (var i in datares) {
							var members = document.getElementById('list_displayed');
							var details = document.createElement('ul');
							details.style.listStyleType = 'none';
							var member_email = document.createElement('li');
							var member_name = document.createElement('li');
							var dash = document.createElement("li");
							dash.innerHTML = "____________________________________________________";
							member_email.innerHTML = datares[i]['email'];
							member_name.innerHTML = datares[i]['fname'] + ' ' + datares[i]['lname'];
							if (datares[i]['email'] == localStorage.details_user) {
								member_email.style.color = "red";
								member_name.style.color = "red";
							}
							details.appendChild(member_email);
							details.appendChild(member_name);
							members.appendChild(details);
							if (i != datares.length - 1) {
								details.appendChild(dash);
							}
						}
					});
			}
		}
	};
	close = (e) => {
		if ((this.state.members = 'open')) {
			this.setState({ members: 'closed' });
		}
	};
	render() {
		if (this.state.members == 'open') {
			return (
				<React.Fragment>
					<section>
						<br />
						<br />
						<button
							id="member_list"
							style={{
								backgroundColor: '#2c3531',
								color: 'white',
								fontSize: '150%',
								borderRadius: '10px',
								marginLeft: '2%'
							}}
							onClick={this.close}
						>
							X
						</button>
						<br />
						<Display_list />
					</section>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<section>
						<br />
						<br />
						<button
							id="member_list"
							style={{
								backgroundColor: '#2c3531',
								color: 'white',
								fontSize: '150%',
								marginLeft: '2%',
								borderRadius: '10px'
							}}
							onClick={this.open}
						>
							☰ Members
						</button>
					</section>
				</React.Fragment>
			);
		}
	}
}
class Display_list extends Component {
	render() {
		return (
			<React.Fragment>
				<section
					style={{
						marginLeft: '2%',
						marginRight: '70%',
						borderRadius: '20%'
					}}
				>
					<ul
						id="list_displayed"
						style={{
							borderRadius: '15px',
							padding: '12px 20px',
							listStyleType: 'inherit',
							backgroundColor: '#2c3531',
							color: 'white'
						}}
					/>
				</section>
			</React.Fragment>
		);
	}
}
class Chat_box extends Component {
	constructor(props){
		super(props);
		this.state = {refresh:false};
	}
	send = (e) => {
		let msg = document.getElementById('msg').value;
		var d = new Date();
		var date = d.getDate();
		var month = d.getMonth();
		var year = d.getFullYear();
		var hrs = d.getHours();
		var mins = d.getMinutes();
		var sec = d.getSeconds();
		month += 1;
		if (date < 10) {
			date = '0' + date;
		}
		if (month < 10) {
			month = '0' + month;
		}
		if (hrs < 10) {
			hrs = '0' + hrs;
		}
		if (mins < 10) {
			mins = '0' + mins;
		}
		if (sec < 10) {
			sec = '0' + sec;
		}
		if (localStorage.login_response == 'Successfully logged-in!!!') {
			fetch('http://5.181.217.131:5000/pushchat', {
				mode: 'cors',
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: localStorage.details_user,
					message: msg,
					grp_id: localStorage.chat_g,
					created: localStorage.chat_c,
					dt: year + '-' + month + '-' + date + ' ' + hrs + ':' + mins + ':' + sec
				})
			})
				.then((response) => response.json())
				.then((datares) => {
					var messages = document.getElementById('messages');
					var new_email = document.createElement('li');
					var new_message = document.createElement('li');
					var new_dt = document.createElement('li');
					new_email.innerHTML = datares['email'];
					new_email.style.fontWeight = "bold";
					new_message.innerHTML = datares['message'];
					new_dt.innerHTML = datares['dt'];
					var dash = document.createElement('li');
					dash.innerHTML = '_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _';
					if (datares["email"] == localStorage.details_user) {
						new_email.style.color = "green";
					}
					messages.appendChild(new_email);
					messages.appendChild(new_message);
					messages.appendChild(new_dt);
					messages.appendChild(dash);
				});
		}
		document.getElementById('msg').value = '';
	};
	render() {
		const numbers = ["Chat Messages: ",];
		const updatedNums = numbers.map((number)=>{ 
			return <li style={{fontWeight:'bold',fontSize:'150%'}}>{number}</li>; 
		});
		return (
			<React.Fragment>
				<section
					style={{
						backgroundColor: 'white',
						marginLeft: '10%',
						marginRight: '10%',
						borderRadius: '20px',
						padding: '12px 20px'
					}}
				>
					<ul id="messages" style={{ listStyleType: 'none' }} >{updatedNums}</ul>
					<input
						id="msg"
						placeholder="Type your message here"
						style={{ width: '90%', fontSize: '150%', borderRadius: '5px' }}
					/>
					<text> </text>
					<button
						style={{
							fontSize: '150%',
							backgroundColor: '#2c3531',
							borderRadius: '5px',
							color: 'white'
						}}
						onClick={this.send}
					>
						{' '}
						Send{' '}
					</button>
				</section>
			</React.Fragment>
		);
	}
}
export default Chat;
const members = {
	width: '10%',
	color: 'white'
};
