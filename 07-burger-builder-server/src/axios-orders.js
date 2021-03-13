import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-ad68f-default-rtdb.firebaseio.com/',
});

export default instance;
