import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ name: 'Gary', age: 31 },
			{ Name: 'Rowe', age: 1 },
			{ name: 'Katie', age: 28 },
		],
	};

	switchNameHandler = (newName) => {
		// DON'T do this
		//this.state.persons[0].name = 'Hello';
		this.setState({
			persons: [
				{ name: newName, age: 31 },
				{ Name: 'Rowe', age: 1 },
				{ name: 'Katie', age: 35 },
			],
			showPersons: false,
		});
	};

	nameChangedHandler = (event) => {
		this.setState({
			persons: [
				{ name: 'Gary', age: 31 },
				{ name: event.target.value, age: 1 },
				{ name: 'Katie', age: 35 },
			],
		});
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	render() {
		const style = {
			backgroundColor: 'white',
			font: 'inherit',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
		};

		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<div>
					<Person
						name={this.state.persons[0].name}
						age={this.state.persons[0].age}
						click={this.switchNameHandler.bind(this, 'Garrrry!')}
					>
						My Hobbies: Racing
					</Person>
					<Person
						name={this.state.persons[1].name}
						age={this.state.persons[1].age}
						changed={this.nameChangedHandler}
					/>
					<Person
						name={this.state.persons[2].name}
						age={this.state.persons[2].age}
					/>
				</div>
			);
		}

		return (
			<div className="App">
				<h1>Hi, I'm a react app</h1>
				<button style={style} onClick={this.togglePersonsHandler}>
					Toggle Persons
				</button>

				{persons}
			</div>
		);
	}
}

export default App;
