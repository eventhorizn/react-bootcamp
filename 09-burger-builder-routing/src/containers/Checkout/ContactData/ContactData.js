import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

class ConctactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Gary Hake',
				address: {
					stree: 'Teststreet 1',
					zipCode: '40223',
					country: 'America',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
		};
		axios
			.post('/orders.json', order)
			.then(() => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log(err);
			});
	};

	render() {
		let form = (
			<form action="">
				<input
					className={styles.Input}
					type="text"
					name="name"
					placeholder="Your Name"
				/>
				<input
					className={styles.Input}
					type="text"
					name="email"
					placeholder="Your Email"
				/>
				<input
					className={styles.Input}
					type="text"
					name="street"
					placeholder="Street"
				/>
				<input
					className={styles.Input}
					type="text"
					name="postal"
					placeholder="Postal Code"
				/>
				<Button btnType="Success" clicked={this.orderHandler}>
					Order
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={styles.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ConctactData;
