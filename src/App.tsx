import React from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'

const AppContent: React.FC = () => {
  const { firebaseUser, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Carregando...</div>
      </div>
    )
  }

  return firebaseUser ? <Home /> : <Login />
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
