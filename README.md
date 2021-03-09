# React Bootcamp

1. A JS Library for building User Interfaces
   - Components are used to build User Interfaces
   - Think of components as custom html elements
1. [Official Documentation](https://reactjs.org/)
1. Why React?
   - UI State becomes difficult to handle w/ vanilla JS
   - Focus on business logic, not on preventing app from exploding
   - Huge ecosystem, active community, high performance
1. React Alternatives
   - Angular
   - Vue
   - Backbone
   - Ember

## Single Page Applications vs Multi-Page Applications

1. SPA
   - Only ONE HTML page, content is (re)rendered on Client
   - Page is built of components, each a react component
   - One ReactDOM.render() call
1. MPA
   - Multiple HTML page, content rendered on server
   - React would be used to create 'widgets'
   - Multiple ReactDOM.render calls since we'd have multiple 'widgets'

## Build Workflow

1. Dependency Manager
   - npm
1. Bundler
   - Webpack
1. Compiler (Next-Gen JS)
   - Babel + Presets
   - Hooked into Webpack
1. Use Development Server

# Creating a React App

1. Run the below function to create the app
   ```
   npx create-react-app my-app
   npm start
   ```
1. Two ways of creating a component
1. Class Based
   ```js
   class App extends Component {
   	render() {
   		return (
   			<div className="App">
   				<h1>Hi, I'm a react app</h1>
   			</div>
   		);
   	}
   }
   ```
   - Has state and lifecycle hooks
1. Functional (stateless)
   ```js
   function App() {
   	return (
   		<div className="App">
   			<h1>Hi, I'm a react app</h1>
   		</div>
   	);
   }
   ```
   - Can use hooks
   - Use this as often as you can
1. In the `index.js` class, you'll see this line
   ```js
   ReactDOM.render(
   	<React.StrictMode>
   		<App />
   	</React.StrictMode>,
   	document.getElementById('root')
   );
   ```
   - With react, we should only use this render function **once**
   - App would be considered our 'root' component
   - We would nest other componentes in root and each other

## Understanding JSX

1. Old school, crappy way w/o jsx
   ```js
   return React.createElement(
   	'div',
   	{ className: 'App' },
   	React.createElement('h1', null, `Hi, I'm a react app`)
   );
   ```
1. JSX allows us to pretend it's html
   ```js
   return (
   	<div className="App">
   		<h1>Hi, I'm a react app</h1>
   	</div>
   );
   ```
   - Looks like html, isn't html (it's js)
1. Restrictions
   - Can't use `class` since it's a reserved js word
     - Must use `className`
   - Must have one root element
1. You can input javascript into html code like so
   ```jsx
   return (
   	<p>I'm a Person and I am {Math.floor(Math.random() * 30)} years old!</p>
   );
   ```
   - Wrap in {}
   - Limited to single line js statements (which can be functions)

## React Props

1. What are props?
   ```js
   const person = (props) => {
   	return (
   		<p>
   			I'm {props.name} and I am {props.age} years old!
   		</p>
   	);
   };
   ```
   ```js
   <Person name="Gary" age="28" />
   <Person name="Row" age="1" />
   <Person name="Katie" age="30" />
   ```
1. Props children
   ```js
   const person = (props) => {
   	return (
   		<div>
   			<p>
   				I'm {props.name} and I am {props.age} years old!
   			</p>
   			<p>{props.children}</p>
   		</div>
   	);
   };
   ```
   ```
   <Person name="Gary" age="28">
      My Hobbies: Racing
   </Person>
   ```
1. Anything in between your component tags is 'children'
1. It can be complex html!

## State

1. State is a special property of a component class

   - Functions use 'hooks' to manage state

   ```js
   state = {
   	persons: [
   		{ name: 'Gary', age: 31 },
   		{ Name: 'Rowe', age: 1 },
   		{ name: 'Katie', age: 28 },
   	],
   };

   render() {
   	return (
   		<div className="App">
   			<h1>Hi, I'm a react app</h1>
   			<button>Switch Name</button>
   			<Person
   				name={this.state.persons[0].name}
   				age={this.state.persons[0].age}
   			>
   				My Hobbies: Racing
   			</Person>
   			<Person
   				name={this.state.persons[1].name}
   				age={this.state.persons[1].age}
   			/>
   			<Person
   				name={this.state.persons[2].name}
   				age={this.state.persons[2].age}
   			/>
   		</div>
   	);
   ```

1. When you update props it triggers an automatic re-rendering
1. When updating state, use setState instead of accessing values directly
   - Merges new values w/ original state
1. You don't want to manage state in very many places
   - Keep this limited to as few class components as possible

## Event Listeners

1. JSX event listeners
   - [Supported Events](https://reactjs.org/docs/events.html#supported-events)
   - The key is that event listeners don't look the same as regular JS
   ```js
   <button onClick={this.switchNameHandler}>Switch Name</button>
   ```
   - onClick vs onclick
   - Notice we aren't calling the function w/ parens
1. We are using the above event listener to demonstrate how state auto re-renders a react component
   ```js
   switchNameHandler = () => {
   	// DON'T do this
   	//this.state.persons[0].name = 'Hello';
   	this.setState({
   		persons: [
   			{ name: 'GArrrrry', age: 31 },
   			{ Name: 'Rowe', age: 1 },
   			{ name: 'Katie', age: 35 },
   		],
   	});
   };
   ```

## Method References Between Components

1. You can pass methods as properties between components

   ```js
   render() {
      return (
         <div className="App">
            <h1>Hi, I'm a react app</h1>
            <button onClick={() => this.switchNameHandler('Garrrrrry')}>
               Switch Name
            </button>
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
            />
            <Person
               name={this.state.persons[2].name}
               age={this.state.persons[2].age}
            />
         </div>
      );
   }
   ```

   ```js
   const person = (props) => {
   	return (
   		<div>
   			<p onClick={props.click}>
   				I'm {props.name} and I am {props.age} years old!
   			</p>
   			<p>{props.children}</p>
   		</div>
   	);
   };
   ```

1. Notice in the first snipped, we are using an arrow function and a bind function to pass switchNameHandler function
   - Try to use bind as often as possible
   - You may run into performance issues w/ arrow functions

## Two-way Binding

1. Person.js

   ```js
   const person = (props) => {
   	return (
   		<div>
   			<p onClick={props.click}>
   				I'm {props.name} and I am {props.age} years old!
   			</p>
   			<p>{props.children}</p>
   			<input type="text" onChange={props.changed} value={props.name} />
   		</div>
   	);
   };

   export default person;
   ```

   - Notice onChange and value

1. App.js
   - Handler
   ```js
   nameChangedHandler = (event) => {
   	this.setState({
   		persons: [
   			{ name: 'Gary', age: 31 },
   			{ name: event.target.value, age: 1 },
   			{ name: 'Katie', age: 35 },
   		],
   	});
   };
   ```
   - Person element
   ```
   <Person
      name={this.state.persons[1].name}
      age={this.state.persons[1].age}
      changed={this.nameChangedHandler}
   />
   ```
   - This allows us to type a value in the input field in the component and have it show up in the name filed

## Styling Components

1. Scoped styles must be 'inline' styles

   ```js
   render() {
         const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
         };

         return (
            <div className="App">
               <h1>Hi, I'm a react app</h1>
               <button
                  style={style}
                  onClick={() => this.switchNameHandler('Garrrrrry')}
               >
                  Switch Name
               </button>
            </div>
         );
      }
   ```

   - There are limitations to what can be done w/ css in this approach

1. You can define a css file
   - Global in scope
   ```js
   import './Person.css';
   ```

## Documentation

1. [Create React App](https://github.com/facebook/create-react-app)
1. [JSX](https://reactjs.org/docs/introducing-jsx.html)
1. [Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
1. [Components and Props](https://reactjs.org/docs/components-and-props.html)
1. [Listenable Events](https://reactjs.org/docs/events.html)

# List and Conditionals

## Conditionals

1. We can use the fact that JSX is just javascript to do something like this:

   ```js
   {
   	this.state.showPersons ? (
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
   	) : null;
   }
   ```

   - Somewhat ugly

1. The JavaScript way

   ```js
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
   ```

   - Perferred way, much more elegant
