import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

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

const httpReducer = (httpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null };
		case 'RESPONSE':
			return { ...httpState, loading: false };
		case 'ERROR':
			return { loading: false, error: action.error };
		case 'CLEAR':
			return { ...httpState, error: null };
		default:
			throw new Error('Should not get here');
	}
};

function Ingredients() {
	const [ing, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});

	//const [ing, setIng] = useState([]);
	//const [isLoading, setIsLoading] = useState(false);
	//const [error, setError] = useState();

	useEffect(() => {
		console.log('RENDERING INGREDIENTS', ing);
	}, [ing]);

	const filteredIngredientsHandler = useCallback((filterIngredients) => {
		//setIng(filterIngredients);
		dispatch({ type: 'SET', ingredients: filterIngredients });
	}, []);

	const addIngredientHandler = (ingredient) => {
		//setIsLoading(true);
		dispatchHttp({ type: 'SEND' });
		fetch(
			'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json',
			{
				method: 'POST',
				body: JSON.stringify(ingredient),
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((response) => {
				//setIsLoading(false);
				dispatchHttp({ type: 'RESPONSE' });
				return response.json();
			})
			.then((responseData) => {
				dispatch({
					type: 'ADD',
					ingredient: { id: responseData.name, ...ingredient },
				});
				// setIng((prevIng) => [
				// 	...prevIng,
				// 	{ id: responseData.name, ...ingredient },
				// ]);
			});
	};

	const removeIngredientHandler = (ingredientId) => {
		//setIsLoading(true);
		dispatchHttp({ type: 'SEND' });

		fetch(
			`https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: 'DELETE',
			}
		)
			.then(() => {
				//setIsLoading(false);
				dispatchHttp({ type: 'RESPONSE' });
				dispatch({ type: 'DELETE', id: ingredientId });
				//setIng((prevIng) => prevIng.filter((ing) => ing.id !== ingredientId));
			})
			.catch((err) => {
				// setError(err.message);
				// setIsLoading(false);
				dispatchHttp({ type: 'ERROR', error: err.message });
			});
	};

	const clearError = () => {
		//setError(null);
		dispatchHttp({ type: 'CLEAR' });
	};

	return (
		<div className="App">
			{httpState.error && (
				<ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
			)}

			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={httpState.loading}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList
					ingredients={ing}
					onRemoveItem={removeIngredientHandler}
				/>
			</section>
		</div>
	);
}

export default Ingredients;
