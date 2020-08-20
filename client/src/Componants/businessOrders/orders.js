import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

var token = localStorage.getItem('tokenIdBusiness');

function Orders() {
	const [counter, setCounter] = useState(0);
	const [orders, setOrders] = useState([]);
	var [clientss, setClients] = useState({});

	useEffect(() => {
		async function rendering() {
			axios
				.get(`/meal/pending/${token}`)
				.then(async (response) => {
					var clients = response.data;
					setClients(clients);
					clientss = clients;

					////////////////////////////
					var x = [];
					for (var key in clientss) {
						var id = key;
						let response = await axios.get(`/user/login/${id}`);

						var user = response.data;

						var obj = {
							id: 0,
							name: '',
							phone: 0,
							orders: [],
						};

						obj.id = id;
						obj.name = user.FullName;
						obj.phone = user.Phone;
						obj.orders = clientss[key];
						x.push(obj);
					}

					setOrders(x);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		rendering();
	}, [counter]);

	let decrement = (e) => {
		var mealId = e.target.name;
		var amount = e.target.value;
		axios
			.post(`/business/meal/pendingOne/${token}`, {
				mealId: mealId,
				mealAmount: -amount,
			})
			.then((response) => {
				console.log('quantitiy updated');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let test = (e) => {
		var userid = e.target.name;
		var checkboxes = document.getElementsByTagName('input');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked === true) {
				var mealid = checkboxes[i].name;
				var amount = checkboxes[i].value;

				axios
					.post(`/business/meal/pendingOne/${token}`, {
						mealId: mealid,
						mealAmount: amount,
					})
					.then((response) => {
						swal({
							title: response.data,
							text: 'Meal Updated',
							icon: 'success',
							button: 'Done',
						});
						////////////////////////////////////
						axios
							.post(`/meal/done/${token}`, {
								mealId: mealid,
								UserId: userid,
								quantity: amount,
							})
							.then((response) => {
								axios
									.post(`/business/meal/pending/${token}`, {
										mealId: mealid,
										userId: userid,
									})
									.then((response) => {
										console.log('successfully removed from pending');
									});
							});
					})
					.catch((err) => {
						console.log(err);
					});
			}
			setCounter(counter + 1);
		}
	};

	return (
		<div>
			<h1>ORDERS</h1>
			{orders.map((Element, index) => {
				if (Element.orders.length > 0) {
					return (
						<div key={index} className='orders'>
							<div>
								<h3>
									Client: &nbsp;
									{Element.name}
								</h3>
								<h3>
									Phone Number: &nbsp;
									{Element.phone}
								</h3>
							</div>
							<div className='orders'>
								{Element.orders.map((Element2, index2) => {
									return (
										<div className='card1' key={index2}>
											<img
												src={Element2.image}
												alt='Avatar'
												style={{ width: '100%', height: '240px' }}
											/>
											<div
												className='container1'
												style={{ backgroundColor: 'white' }}
											>
												<h4>
													<b>{Element2.mealName}</b>
													<br />
													<span>{Element2.mealAmount} orders</span>
												</h4>
												<input
													type='checkbox'
													name={Element2.idMeal}
													value={Element2.mealAmount}
												/>
											</div>
										</div>
									);
								})}
							</div>
							<button
								variant='contained'
								id='btn'
								onClick={test}
								name={Element.id}
							>
								Confirm
							</button>
							{/* <hr /> */}
						</div>
					);
				}
			})}
		</div>
	);
}

export default Orders;
