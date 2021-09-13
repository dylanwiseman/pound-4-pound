const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...action.value,
      };
    }
    case "UPDATE_USER": {
      console.log("user as recieved by reducer: ", state);
      console.log("action.value received by reducer: ", action.value);
      return {
        ...state,
        ...action.value,
      };
    }
    default:
      return { ...state };
  }
}
