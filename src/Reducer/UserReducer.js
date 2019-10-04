import ActionTypes from '../Action/ActionTypes';

export default function UserReducer(preState = {list:[], total: 0}, action) {
  switch(action.type) {
    case ActionTypes.LOAD_USER_LIST: 
      return action.payload;
    default:
       return preState;
  }
}