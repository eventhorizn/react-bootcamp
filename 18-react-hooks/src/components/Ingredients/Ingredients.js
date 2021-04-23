import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
	const [ing, setIng] = useState([]);

	const addIngredientHandler = (ingredient) => {
		setIng((prevIng) => [
			...prevIng,
			{ id: Math.random().toString(), ...ingredient },
		]);
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
