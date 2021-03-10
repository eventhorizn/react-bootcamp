import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ id: 'adreda', name: 'Gary', age: 31 },
			{ id: 'bcbera', name: 'Rowe', age: 1 },
			{ id: 'dyfwy5', name: 'Katie', age: 28 },
		],
	};

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex],
		};

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState({ persons: persons });
	};

	deletePersonHanlder = (personIndex) => {
		const persons = [...this.state.persons];

		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};

	render() {
		let persons = null;
		let btnClass = '';

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, index) => {
						return (
							<Person
								click={() => this.deletePersonHandler(index)}
								name={person.name}
								age={person.age}
								key={person.id}
								changed={(event) => this.nameChangedHandler(event, person.id)}
							/>
						);
					})}
				</div>
			);

			btnClass = 'red';
		}

		const assignedClasses = [];
		if (this.state.persons.length <= 2) {
			assignedClasses.push('red');
		}
		if (this.state.persons.length <= 1) {
			assignedClasses.push('bold');
		}

		return (
			<div className="App">
				<h1>Hi, I'm a React App</h1>
				<p className={assignedClasses.join(' ')}>This is really working!</p>
				<button className={btnClass} onClick={this.togglePersonsHandler}>
					Toggle Persons
				</button>
				{persons}
			</div>
		);
	}
}

export default App;
