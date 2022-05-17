import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  guests: undefined
};

export const searchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <searchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        guests: state.guests,
        dispatch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};


















