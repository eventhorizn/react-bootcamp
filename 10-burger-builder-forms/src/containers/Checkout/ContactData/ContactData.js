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
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
			},
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		this.setState({ loading: true });

		const formData = {};
		for (let formElIdentifier in this.state.orderForm) {
			formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		};

		console.log(order);

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

	checkValidation(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};

		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidation(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		this.setState({ orderForm: updatedOrderForm });
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
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formEl) => (
					<Input
						key={formEl.id}
						elementType={formEl.config.elementType}
						elementConfig={formEl.config.elementConfig}
						value={formEl.config.value}
						invalid={!formEl.config.valid}
						shouldValidate={formEl.config.validation}
						touched={formEl.config.touched}
						changed={(event) => this.inputChangedHandler(event, formEl.id)}
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
