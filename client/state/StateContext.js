import React, { useState, createContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // const [films, setFilms] = useState(["Joker1", "Joker2", "Joker3"]);
  const [weightUnitsValue, setWeightUnitsValue] = useState("kg");
  const [heightUnitsValue, setHeightUnitsValue] = useState("cm");

  return (
    <StateContext.Provider
      value={{
        // films,
        // setFilms,
        weightUnitsValue,
        setWeightUnitsValue,
        heightUnitsValue,
        setHeightUnitsValue,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
