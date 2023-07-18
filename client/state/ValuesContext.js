import React, { useState, createContext } from "react";

export const ValuesContext = createContext();

export const ValuesProvider = ({ children }) => {
  //   console.log("ValuesProvider: before weightValue");
  const [weightValue, setWeightValue] = useState("165");
  const [heightValue, setHeightValue] = useState("174");

  //   console.log("ValuesProvider: before useMemo");
  //   // const value = useMemo(
  //   //   () => ({
  //   //     weightValue,
  //   //     setWeightValue,
  //   //     heightValue,
  //   //     setHeightValue,
  //   //   }),
  //   //   [weightValue, heightValue]
  //   // );

  //   console.log(
  //     "ValuesProvider: before return block, weightValue:" + weightValue
  //   );
  return (
    <ValuesContext.Provider
      value={{ weightValue, setWeightValue, heightValue, setHeightValue }}
    >
      {children}
    </ValuesContext.Provider>
  );
};
