import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
	const [ing, setIng] = useState([]);

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
		setIng((prevIng) => prevIng.filter((ing) => ing.id !== ingredientId));
	};

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList
					ingredients={ing}
					onRemoveItem={removeIngredientHandler}
				/>
			</section>
		</div>
	);
}

export default Ingredients;
