import React, { useState } from 'react'

export interface State {
  auth?: string
  setAuth?: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const StateContext = React.createContext<State>({} as State)

export const StateProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = useState<string | undefined>(undefined)

  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}
