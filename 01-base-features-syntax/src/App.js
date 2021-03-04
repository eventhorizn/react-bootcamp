import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>Hi, I'm a react app</h1>
				<Person name="Gary" age="28">
					My Hobbies: Racing
				</Person>
				<Person name="Row" age="1" />
				<Person name="Katie" age="30" />
			</div>
		);
		// return React.createElement(
		// 	'div',
		// 	{ className: 'App' },
		// 	React.createElement('h1', null, `Hi, I'm a react app`)
		// );
	}
}

export default App;
