import React from 'react';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

const layout = (props) => (
	// Adjacent elements
	<Aux>
		<Toolbar />
		<main className={styles.content}>{props.children}</main>
	</Aux>
);

export default layout;
