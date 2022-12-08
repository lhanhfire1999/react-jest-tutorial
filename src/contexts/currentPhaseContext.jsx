import React, { useContext } from 'react'

const CurrentPhaseContext = React.createContext({
  onSetCurrentPhase: () => {},
})

export const CurrentPhaseProvider = ({ children, onSetCurrentPhase }) => {
  return (
    <CurrentPhaseContext.Provider value={{ onSetCurrentPhase }}>
      {children}
    </CurrentPhaseContext.Provider>
  )
}

export const useCurrentPhase = () => {
  return useContext(CurrentPhaseContext)
}
