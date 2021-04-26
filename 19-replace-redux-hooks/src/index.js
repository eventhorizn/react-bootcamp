import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
//import productReducer from './store/reducers/products';
//import ProductsProvider from './context/products';
import configureStore from './hooks/products-store';

// const rootReducer = combineReducers({
// 	shop: productReducer,
// });

// const store = createStore(rootReducer);

configureStore();

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	// <ProductsProvider>
	// 	<BrowserRouter>
	// 		<App />
	// 	</BrowserRouter>
	// </ProductsProvider>,
	document.getElementById('root')
);
