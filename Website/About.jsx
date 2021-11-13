import React, { Component, StyleSheet } from 'react';
import { Link } from 'react-router-dom';
import { Badge,Container, Row, Col } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Nav from './Nav';
class About extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Nav />
				<br />
				<br />
				<br />
				<P1 />
			</React.Fragment>
		);
	}
}
class P1 extends React.Component {
	render() {
		const para = {
			color: 'white',
			fontSize: '160%',
			marginLeft: '5%',
			marginRight: '5%',
			textShadow:'4px 4px 4px #000',
			textAlign:'justify'
		};
		const head = {
			color: 'yellow',
      fontSize: '300%',
      marginLeft:'21%'
		};
		return (
			<React.Fragment>
				<h1
					style={head}
				>
					What is Philos?
				</h1>
				<Container fluid>
					<Row className="justify-content-md-center">
						<Col lg="5" md={7}>
							<p style={para}>
								Philos ( Greek word meaning <b>Friend</b> ), is a service that matches like-minded
								people using Machine Learning technologies. By using K-Mean Clustering Machine Learning
								algorithm, we create a group of the most compatible people, taking into account
								parameters like location, age,etc. It conceals the identity of all the users in the
								group for a period of seven days. After which the identity and the uploaded images along
								with information provided at the time of creating the account is displayed to all the
								users who are in that group. After the threshold period the users are encouraged to meet
								in the real world, in order to interact and share a new & unique experience.
							</p>
						</Col>
						<Col xs lg="auto" md={{ span: 4, offset: 0 }}>
							<div>
								<img
									style={{
										marginLeft: 'auto',
										marginRight: 'auto',
                    display: 'block',
                    borderRadius:'20px'
									}}
									width="auto"
									height="555em"
									alt="Friends"
									src="https://www.leannawoodleyphotography.com/uploads/7/5/1/3/7513241/4742951_orig.jpg"
								/>
							</div>
						</Col>
					</Row>
				</Container>
				<h1 style={head}>Our Mission</h1>
				<Container fluid >
					<Row className="justify-content-md-center">
						<Col lg="3" md={4}>
							<div>
								<img
									style={{
										marginLeft: 'auto',
										marginRight: 'auto',
                    display: 'block',
                    borderRadius:'20px'
									}}
									width="350em"
									height="350em"
									alt="Friends"
									src="https://th.bing.com/th/id/OIP.EV1PhDAuS66S9dvzpQ5p1QHaNL?w=187&h=333&c=7&o=5&dpr=1.2&pid=1.7"
								/>
							</div>
						</Col>
						<Col md={{span:5,offset:0.5}}>
							<p
								style={{
									color: 'white',
									fontSize: '160%',
									textShadow:'4px 4px 4px #000',
			                        textAlign:'justify'
								}}
							>
								Humans are social creatures and therefore, we need to connect. We have been living in
								communities and tribes since the ancient times. But in this age of <b>Digitization</b>{' '}
								as more and more aspects of our lives are moving online, our social life is moving there
								too. We have more friends and followers on social media than in real life. Meaningful
								real world connections are very important in a Human's life and therefore this scenario
								needs to be changed. Philos is a service that aims towards this problem, and we are sure
								we would make an impact in soving it.
							</p>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
export default About;
