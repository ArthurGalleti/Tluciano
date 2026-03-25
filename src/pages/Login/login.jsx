import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './login.css'

function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ?? '/home'

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    setLoading(true)
    const err = login(email.trim(), password)
    setLoading(false)
    if (err) { setError(err); return }
    navigate(from, { replace: true })
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <span className="auth__emoji">🍬</span>
          <h1 className="auth__title">Bem-vindo de volta</h1>
          <p className="auth__subtitle">Acesse sua conta SweetDrop</p>
        </div>

        {error && <p className="auth__error">{error}</p>}

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__field">
            <label className="auth__label" htmlFor="email">E-mail</label>
            <input
              id="email"
              className="auth__input"
              type="email"
              placeholder="voce@exemplo.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth__field">
            <label className="auth__label" htmlFor="password">
              Senha
              <Link to="#" className="auth__forgot">Esqueceu a senha?</Link>
            </label>
            <div className="auth__input-wrap">
              <input
                id="password"
                className="auth__input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth__eye"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth__switch">
          Não tem uma conta? <Link to="/register" className="auth__switch-link">Cadastre-se</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
