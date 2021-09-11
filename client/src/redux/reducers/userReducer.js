const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...action.value,
      };
    }
    case "UPDATE_USER": {
      return {
        ...state.user,
        ...action.value,
      };
    }
    default:
      return { ...state };
  }
}
