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

## Creating a React App

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
1. We should really use Props
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
   - Anything in between your component tags is 'children'
   - It can be complex html!
