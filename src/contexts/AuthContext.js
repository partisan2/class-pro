import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { ChatContextProvider } from './ChatContext'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword
    }

  return (
    <AuthContext.Provider value={value}>
        <ChatContextProvider>
            {!loading && children}
        </ChatContextProvider>
    </AuthContext.Provider>
  )
}


