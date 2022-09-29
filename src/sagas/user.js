/*
|--------------------------------------------------
| Service template for create service layer
| service layer is power by redux-saga, which provide side effects for redux
|--------------------------------------------------
*/

// import {addUser, deleteUser, updateUser, getUser,getSelectedUser} from '../service';
// import {all, call, put, takeLatest} from 'redux-saga/effects';
// import * as actionTypes from '../constants/ActionTypes';

// export function* addUserSaga(action) {
//   try {
//     const payload=yield call(addUser, action.payload);
//     yield put({
//       type: actionTypes.USER_ADD_SUCCESS,
//       data: payload,
//     });
//   } catch (err) {
//     yield put({
//       type: actionTypes.USER_ACTION_FAIL,
//     });
//   }
// }
// export function* deleteUserSaga(action) {
//   try {
//     const payload=yield call(deleteUser, action.id);
//     yield put({
//       type: actionTypes.USER_DELETE_SUCCESS,
//       data: payload,
//     });
//   } catch (err) {
//     console.log(err)
//     yield put({
//       type: actionTypes.USER_ACTION_FAIL,
//     });
//   }
// }
// export function* updateUserSaga(action) {
//   try {
//     const payload=yield call(updateUser, action.id, action.payload);
//     yield put({
//       type: actionTypes.USER_UPDATE_SUCCESS,
//       data: payload,
//     });
//   } catch (err) {
//     console.log(err)
//     yield put({
//       type: actionTypes.USER_ACTION_FAIL,
//     });
//   }
// }
// export function* getUserSaga() {
//   try {
//     const payload=yield call(getUser);
//     yield put({
//       type: actionTypes.USER_GET_SUCCESS,
//       data: payload,
//     });
//   } catch (err) {
//     yield put({
//       type: actionTypes.USER_ACTION_FAIL,
//     });
//   }
// }

// export function* getSelectedUserSaga(action) {
//   try {
//     const payload=yield call(getSelectedUser,action.id);
//     yield put({
//       type: actionTypes.USER_SELECTED_SUCCESS, 
//       data: payload,
//     });
//   } catch (err) {

//     yield put({
//       type: actionTypes.USER_ACTION_FAIL,
//     });
//   }
// }

function* index()  {

  // yield all([
  //   takeLatest(actionTypes.USER_ADD_REQUEST, addUserSaga),
  //   takeLatest(actionTypes.USER_DELETE_REQUEST, deleteUserSaga),
  //   takeLatest(actionTypes.USER_UPDATE_REQUEST, updateUserSaga),
  //   takeLatest(actionTypes.USER_GET_REQUEST, getUserSaga),
  //   takeLatest(actionTypes.USER_SELECTED_REQUEST, getSelectedUserSaga),
  // ]);
}
export default index;