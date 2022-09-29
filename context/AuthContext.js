import { createContext, useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../firebase'

const UserContext = createContext() // Create a global user context for website

export default function AuthContext({ children }) {
    const [user, loading] = useAuthState(auth); // Gather user and loading state with useAuthState

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuthContext = () => useContext(UserContext); // Export a custom hook for AuthContext