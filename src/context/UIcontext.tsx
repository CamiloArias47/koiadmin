import React, { type Reducer, useReducer, useCallback, useMemo } from 'react'

interface actionType {
  type: string
  payload?: UI
}

interface UI {
  loggedin?: boolean
  userLoggedIn?: () => void
}

type UIReducer = UI | undefined

enum ReducerActions {
  userLoggeding = 'USER-LOGGEDING'
}

const initialState: UI = {
  loggedin: false
}

function uiReducer (state: UI, action: actionType): UIReducer {
  switch (action.type) {
    case ReducerActions.userLoggeding:
      return {
        ...state,
        loggedin: true
      }
  }
}

export const UIcontext = React.createContext(initialState)

export const UIprovider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<any, any>>(uiReducer, initialState)

  const userLoggedIn = useCallback(
    () => {
      dispatch({ type: ReducerActions.userLoggeding })
    },
    [dispatch]
  )

  const value = useMemo(() => ({
    ...state,
    userLoggedIn
  }), [state])

  return <UIcontext.Provider value={value} {...props} />
}

export const useUIcontext = (): UI => {
  const context = React.useContext(UIcontext)
  if (context === undefined) {
    throw new Error('useUIcontext must be used within a UIcontext provider')
  }
  return context
}
