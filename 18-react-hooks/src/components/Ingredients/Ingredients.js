import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
	switch (action.type) {
		case 'SET':
			return action.ingredients;
		case 'ADD':
			return [...currentIngredients, action.ingredient];
		case 'DELETE':
			return currentIngredients.filter((ing) => ing.id !== action.id);
		default:
			throw new Error('Should not get here');
	}
};

// const httpReducer = (httpState, action) => {
// 	switch (action.type) {
// 		case 'SEND':
// 			return { loading: true, error: null };
// 		case 'RESPONSE':
// 			return { ...httpState, loading: false };
// 		case 'ERROR':
// 			return { loading: false, error: action.error };
// 		case 'CLEAR':
// 			return { ...httpState, error: null };
// 		default:
// 			throw new Error('Should not get here');
// 	}
// };

function Ingredients() {
	const [ing, dispatch] = useReducer(ingredientReducer, []);
	const {
		isLoading,
		error,
		data,
		sendRequest,
		reqExtra,
		reqIdentifier,
		clear,
	} = useHttp();

	// const [httpState, dispatchHttp] = useReducer(httpReducer, {
	// 	loading: false,
	// 	error: null,
	// });

	//const [ing, setIng] = useState([]);
	//const [isLoading, setIsLoading] = useState(false);
	//const [error, setError] = useState();

	useEffect(() => {
		if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
			dispatch({ type: 'DELETE', id: reqExtra });
		} else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
			dispatch({
				type: 'ADD',
				ingredient: { id: data.name, ...reqExtra },
			});
		}
	}, [data, reqExtra, reqIdentifier, isLoading, error]);

	const filteredIngredientsHandler = useCallback((filterIngredients) => {
		//setIng(filterIngredients);
		dispatch({ type: 'SET', ingredients: filterIngredients });
	}, []);

	const addIngredientHandler = useCallback(
		(ingredient) => {
			sendRequest(
				'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json',
				'POST',
				JSON.stringify(ingredient),
				ingredient,
				'ADD_INGREDIENT'
			);
			//setIsLoading(true);
			// dispatchHttp({ type: 'SEND' });
			// fetch(
			// 	'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json',
			// 	{
			// 		method: 'POST',
			// 		body: JSON.stringify(ingredient),
			// 		headers: { 'Content-Type': 'application/json' },
			// 	}
			// )
			// 	.then((response) => {
			// 		//setIsLoading(false);
			// 		dispatchHttp({ type: 'RESPONSE' });
			// 		return response.json();
			// 	})
			// 	.then((responseData) => {
			// 		dispatch({
			// 			type: 'ADD',
			// 			ingredient: { id: responseData.name, ...ingredient },
			// 		});
			// 		// setIng((prevIng) => [
			// 		// 	...prevIng,
			// 		// 	{ id: responseData.name, ...ingredient },
			// 		// ]);
			// 	});
		},
		[sendRequest]
	);

	const removeIngredientHandler = useCallback(
		(ingredientId) => {
			sendRequest(
				`https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
				'DELETE',
				null,
				ingredientId,
				'REMOVE_INGREDIENT'
			);
			//setIsLoading(true);
			//dispatchHttp({ type: 'SEND' });
			// fetch(
			// 	`https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
			// 	{
			// 		method: 'DELETE',
			// 	}
			// )
			// 	.then(() => {
			// 		//setIsLoading(false);
			// 		dispatchHttp({ type: 'RESPONSE' });
			// 		dispatch({ type: 'DELETE', id: ingredientId });
			// 		//setIng((prevIng) => prevIng.filter((ing) => ing.id !== ingredientId));
			// 	})
			// 	.catch((err) => {
			// 		// setError(err.message);
			// 		// setIsLoading(false);
			// 		dispatchHttp({ type: 'ERROR', error: err.message });
			// 	});
		},
		[sendRequest]
	);

	// const clearError = useCallback(() => {
	// 	//setError(null);
	// 	//dispatchHttp({ type: 'CLEAR' });
	// }, []);

	const ingredientList = useMemo(() => {
		return (
			<IngredientList
				ingredients={ing}
				onRemoveItem={removeIngredientHandler}
			/>
		);
	}, [ing, removeIngredientHandler]);

	return (
		<div className="App">
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
			</section>
		</div>
	);
}

export default Ingredients;
