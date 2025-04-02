'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = () => {
      const authenticated = localStorage.getItem('adminAuthenticated') === 'true'
      setIsAuthenticated(authenticated)
      
      // Redirect if trying to access protected routes without authentication
      if (!authenticated && pathname?.startsWith('/admin/dashboard')) {
        router.push('/admin')
      }
      
      // Redirect if trying to access login page while authenticated
      if (authenticated && pathname === '/admin') {
        router.push('/admin/dashboard')
      }
    }
    
    checkAuth()
  }, [pathname, router])
  
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple client-side authentication for demo purposes
    // In a production app, this would be a server-side API call
    if (username === 'admin' && password === 'gehan123') {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }
  
  const logout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    router.push('/admin')
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
