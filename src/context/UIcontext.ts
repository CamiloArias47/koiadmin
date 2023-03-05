import React, { useCallback, useMemo} from 'react'
const initialState = {
  loggedin: false
}

function uiReducer (state, action) {
  switch (action.type) {
    case 'USER-LOGGEDIN': {
      return {
        ...state,
        loggedin: true
      }
    }
  }
}

export const UIcontext = React.createContext(initialState)

export const UIprovider = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const userLoggedIn = useCallback(
    () => {
      dispatch({ type: 'USER-LOGGEDIN' })
    },
    [dispatch]
  )

  const value = useMemo(() => ({
    ...state,
    userLoggedIn
  }),[state])

  return <UIcontext.Provider value={value} {...props} />
}

export const useUIcontext = () => {
  const context = React.useContext(UIcontext)
  if (context === undefined) {
    throw new Error('useUIcontext must be used within a UIcontext provider')
  }
  return context
}
