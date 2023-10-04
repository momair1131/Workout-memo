import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext); //return the "value" from the workoutContext which has state and dispatch
  if (!context) {
    throw Error("useWorkoutContext must be used inside WorkoutContextProvider");
  }
  return context;
};
