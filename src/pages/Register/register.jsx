import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import '../Login/login.css'



import { db } from '../../firebaseConfig' 
import { collection, addDoc } from "firebase/firestore"

function Register() {
  const { register, user } = useAuth()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    navigate('/home', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

   
    if (!name || !email || !password) {
      setError('Preencha todos os campos obrigatórios.')
      return
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    setLoading(true)

    try {
    
      const err = await register(name.trim(), email.trim(), password, phone.trim())
      
      if (err) { 
        setError(err)
        setLoading(false)
        return 
      }

    
      await addDoc(collection(db, "usuarios"), {
        nome: name.trim(),
        email: email.trim().toLowerCase(),
        telefone: phone.trim(),
        dataCriacao: new Date(),
        tipo: 'cliente' 
      });

     
      navigate('/home', { replace: true })

    } catch (e) {
      console.error("Erro no processo de registro:", e)
      setError("Ocorreu um erro ao salvar seus dados. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__header">
          <span className="auth__emoji">🍰</span>
          <h1 className="auth__title">Criar uma conta</h1>
          <p className="auth__subtitle">Junte-se ao SweetDrop e comece a pedir</p>
        </div>

        {error && <p className="auth__error">{error}</p>}

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__field">
            <label className="auth__label" htmlFor="name">Nome Completo</label>
            <input
              id="name"
              className="auth__input"
              type="text"
              placeholder="Digite seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

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
            <label className="auth__label" htmlFor="password">Senha</label>
            <div className="auth__input-wrap">
              <input
                id="password"
                className="auth__input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mín. 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
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

          <div className="auth__field">
            <label className="auth__label" htmlFor="phone">Telefone <span className="auth__optional">(opcional)</span></label>
            <input
              id="phone"
              className="auth__input"
              type="tel"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
          </div>

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <p className="auth__switch">
          Já tem uma conta? <Link to="/login" className="auth__switch-link">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

export default Register