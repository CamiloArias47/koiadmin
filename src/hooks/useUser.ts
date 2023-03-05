interface User {
  loggedin: boolean
}

export default function useUser (): User {
  return {
    loggedin: false
  }
}
