import React, { useState, createContext } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [weightUnitsValue, setWeightUnitsValue] = useState('kg')
  const [heightUnitsValue, setHeightUnitsValue] = useState('cm')

  return (
    <StateContext.Provider
      value={{
        weightUnitsValue,
        setWeightUnitsValue,
        heightUnitsValue,
        setHeightUnitsValue,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
