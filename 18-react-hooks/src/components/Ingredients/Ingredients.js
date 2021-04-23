import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
	const [ing, setIng] = useState([]);

	// useEffect(() => {
	// 	fetch(
	// 		'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json'
	// 	)
	// 		.then((response) => response.json())
	// 		.then((responseData) => {
	// 			const loadedIngredients = [];

	// 			for (const key in responseData) {
	// 				loadedIngredients.push({
	// 					id: key,
	// 					title: responseData[key].title,
	// 					amount: responseData[key].amount,
	// 				});
	// 			}

	// 			setIng(loadedIngredients);
	// 		});
	// }, []);

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
		fetch(
			'https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients.json',
			{
				method: 'POST',
				body: JSON.stringify(ingredient),
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((response) => {
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
		fetch(
			`https://react-hooks-update-eaf4b-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: 'DELETE',
			}
		).then(() => {
			setIng((prevIng) => prevIng.filter((ing) => ing.id !== ingredientId));
		});
	};

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

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
