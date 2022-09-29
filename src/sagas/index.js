import { fork, all } from 'redux-saga/effects';
import user from './user';

function* index() {
yield all([
	fork(user),
]);
}

export default index;
