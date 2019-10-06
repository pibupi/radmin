import ActionTypes from '../Action/ActionTypes';

export default function UserReducer(preState = {list:[], total: 0}, action) {
  switch(action.type) {
    case ActionTypes.LOAD_USER_LIST: 
      return action.payload;
    case ActionTypes.ADD_USER:
      preState.list.unshift(action.payload);
      preState.total+=1;
      return {...preState};
    default:
       return preState;
  }
}