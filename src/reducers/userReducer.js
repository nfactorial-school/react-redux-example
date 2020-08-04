import { NEW_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_USER:
      return action.payload;
    default:
      return state;
  }
};
