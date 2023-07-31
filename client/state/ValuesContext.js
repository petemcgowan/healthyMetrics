import React, { useState, createContext } from 'react'

export const ValuesContext = createContext()

export const ValuesProvider = ({ children }) => {
  const [weightValue, setWeightValue] = useState('165')
  const [heightValue, setHeightValue] = useState('174')

  return (
    <ValuesContext.Provider
      value={{ weightValue, setWeightValue, heightValue, setHeightValue }}
    >
      {children}
    </ValuesContext.Provider>
  )
}
