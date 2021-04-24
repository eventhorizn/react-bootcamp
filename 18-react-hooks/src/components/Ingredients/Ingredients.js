import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
	const [ing, setIng] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		console.log('RENDERING INGREDIENTS', ing);
	}, [ing]);

	const filteredIngredientsHandler = useCallback(
		(filterIngredients) => {
			setIng(filterIngredients);
		},
		[setIng]
	);

	const addIngredientHandler = (ingredient) => {
		setIsLoading(true);

		fetch(
			'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json',
			{
				method: 'POST',
				body: JSON.stringify(ingredient),
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((response) => {
				setIsLoading(false);
				return response.json();
			})
			.then((responseData) => {
				setIng((prevIng) => [
					...prevIng,
					{ id: responseData.name, ...ingredient },
				]);
			});
	};

	const removeIngredientHandler = (ingredientId) => {
		setIsLoading(true);

		fetch(
			`https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: 'DELETE',
			}
		)
			.then(() => {
				setIsLoading(false);
				setIng((prevIng) => prevIng.filter((ing) => ing.id !== ingredientId));
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	};

	const clearError = () => {
		setError(null);
	};

	return (
		<div className="App">
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
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
