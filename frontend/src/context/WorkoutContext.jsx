import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// children represent whatever component contextProvider wraps i.e. App component in this case
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutsReducer, {
    // similar to useState that we get back state's value and use dispatch func. to update that state's value and also specify the initial value i.e. workouts in this case but the only difference in Reducer function

    workouts: null,
  });

  // when we call dispatch function in return out reducer function invoke an passes the action into the reducer function so that it update the state using the info and data

  return (
    //using the Context Provider to wrapping the component that need the state context i.e. WorkoutContext in this case
    <WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutContext.Provider> // here dispatch function calling WorkoutReducer function and state variable is the current state above which is workout: null
  );
};
