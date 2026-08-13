import { onAuthStateChanged, User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestoreDb } from '../firebaseConfig'
import type { UserProfile, ViewedPatient } from '../types'

type AuthContextType = {
  firebaseUser: User | null
  profile: UserProfile | null
  viewedPatient: ViewedPatient | null
  setViewedPatient: (patient: ViewedPatient | null) => void
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [viewedPatient, setViewedPatient] = useState<ViewedPatient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true)

      if (!currentUser) {
        setFirebaseUser(null)
        setProfile(null)
        setViewedPatient(null)
        setLoading(false)
        return
      }

      setFirebaseUser(currentUser)

      try {
        const snapshot = await getDoc(doc(firestoreDb, 'users', currentUser.uid))

        if (snapshot.exists()) {
          const data = snapshot.data() as {
            name?: string
            email?: string
            type?: 'profissional' | 'paciente'
            assignedProfessionalId?: string
          }

          const nextProfile: UserProfile = {
            uid: currentUser.uid,
            name: data.name ?? currentUser.displayName ?? '',
            email: data.email ?? currentUser.email ?? '',
            type: data.type === 'profissional' ? 'profissional' : 'paciente',
            assignedProfessionalId: data.assignedProfessionalId?.trim().toLowerCase(),
          }

          setProfile(nextProfile)

          if (nextProfile.type === 'paciente') {
            setViewedPatient({
              uid: nextProfile.uid,
              name: nextProfile.name,
              email: nextProfile.email,
              type: 'paciente',
              assignedProfessionalId: nextProfile.assignedProfessionalId,
            })
          } else {
            setViewedPatient(null)
          }
        }
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    await auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        profile,
        viewedPatient,
        setViewedPatient,
        loading,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
