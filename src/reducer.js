import API from "./utils/API";
import { v4 as uuidv4 } from "uuid";

const newArray = API.map((api, i) => {
  return { ...api, id: uuidv4() };
});

export const initialState = {
  result: newArray,
};

export const actionTypes = {
  ADD_DOG: "ADD_DOG",
  DELETE_DOG: "DELETE_DOG",
  EDIT_DOG: "EDIT_DOG",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_DOG:
      return {
        ...state,
        result: [...state.result, action.result],
      };
    case actionTypes.DELETE_DOG:
      return {
        ...state,
        result: state.result.filter((res) => res.id !== action.result),
      };
    case actionTypes.EDIT_DOG:
      const newState = state.result;
      newState.map((res, i) => {
        if (res.id === action.result.id) {
          newState.splice(i, 1, action.result);
        } else {
          return res;
        }
      });

      return {
        ...state,
        ...newState,
      };
    default:
      return state;
  }
};
export default reducer;
