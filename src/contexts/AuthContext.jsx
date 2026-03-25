import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'sd_users'
const USER_KEY = 'sd_user'

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [] } catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)) ?? null } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  const login = (email, password) => {
    const users = loadUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return 'E-mail ou senha incorretos.'
    const { password: _, ...safe } = found
    setUser(safe)
    localStorage.setItem(USER_KEY, JSON.stringify(safe))
    return null
  }

  const register = (name, email, password, phone) => {
    const users = loadUsers()
    if (users.find((u) => u.email === email)) return 'Este e-mail já está cadastrado.'
    const newUser = { id: Date.now(), name, email, password, phone }
    saveUsers([...users, newUser])
    const { password: _, ...safe } = newUser
    setUser(safe)
    localStorage.setItem(USER_KEY, JSON.stringify(safe))
    return null
  }

  const updateUser = (data) => {
    const users = loadUsers()
    const updated = users.map((u) => u.id === user.id ? { ...u, ...data } : u)
    saveUsers(updated)
    const { password: _, ...safe } = updated.find((u) => u.id === user.id)
    setUser(safe)
    localStorage.setItem(USER_KEY, JSON.stringify(safe))
  }

  const changePassword = (currentPassword, newPassword) => {
    const users = loadUsers()
    const found = users.find((u) => u.id === user.id)
    if (!found || found.password !== currentPassword) return 'Senha atual incorreta.'
    const updated = users.map((u) => u.id === user.id ? { ...u, password: newPassword } : u)
    saveUsers(updated)
    return null
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, updateUser, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
