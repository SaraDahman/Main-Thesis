import React from 'react';
import './style.css';
var status = '';
var token = localStorage.getItem('tokenIdBusiness');
if (token) {
	status = (
		<a
			onClick={() => {
				localStorage.removeItem('tokenIdBusiness');
				localStorage.removeItem('isLoggedIn');
			}}
			href='/'
		>
			logout
		</a>
	);
} else {
	status = null;
}
class Nav extends React.Component {
	render() {
		return (
			<div className='topnav'>
				<a href='/'>Home</a>
				<div className='right'>
					<a href='/About'>About</a>
					<a href='/contact'>Contact us</a>
					<label>{status}</label>
				</div>
			</div>
		);
	}
}

export default Nav;
