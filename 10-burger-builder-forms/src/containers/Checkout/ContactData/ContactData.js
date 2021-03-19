import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ConctactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
			},
			MediaStreamAudioDestinationNode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip',
				},
				value: '',
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail',
				},
				value: '',
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: '',
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form>
				{formElementsArray.map((formEl) => (
					<Input
						key={formEl.id}
						elementType={formEl.config.elementType}
						elementConfig={formEl.config.elementConfig}
						value={formEl.config.value}
					/>
				))}

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
