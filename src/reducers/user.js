// import {
//   USER_ADD_SUCCESS,
//   USER_DELETE_SUCCESS,
//   USER_UPDATE_SUCCESS,
//   USER_GET_SUCCESS,
//   USER_SELECTED_SUCCESS,
//   USER_ACTION_FAIL
// } from '../constants/ActionTypes';

const initState={
    ifexist: true
};

const user = (state=initState, action) => {
    switch (action.type) {
        case true:
          return {
            ...state,
            ifexist: false
          };
    
        default:
          return state;
      }
};
  export default  user;