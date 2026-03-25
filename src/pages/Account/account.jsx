import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './account.css'

function Account() {
  const { user, updateUser, changePassword, logout } = useAuth()
  const navigate = useNavigate()

  const nameParts = user?.name?.split(' ') ?? ['', '']
  const [firstName, setFirstName] = useState(nameParts[0] ?? '')
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [address, setAddress] = useState(user?.address ?? '')
  const [profileMsg, setProfileMsg] = useState('')

  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [passMsg, setPassMsg] = useState('')

  const handleProfileSave = (e) => {
    e.preventDefault()
    if (!firstName || !email) { setProfileMsg('error:Preencha os campos obrigatórios.'); return }
    updateUser({ name: `${firstName} ${lastName}`.trim(), email, phone, address })
    setProfileMsg('success:Perfil atualizado com sucesso!')
    setTimeout(() => setProfileMsg(''), 3000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (!currentPass || !newPass || !confirmPass) { setPassMsg('error:Preencha todos os campos.'); return }
    if (newPass.length < 8) { setPassMsg('error:A nova senha deve ter pelo menos 8 caracteres.'); return }
    if (newPass !== confirmPass) { setPassMsg('error:As senhas não coincidem.'); return }
    const err = changePassword(currentPass, newPass)
    if (err) { setPassMsg(`error:${err}`); return }
    setCurrentPass(''); setNewPass(''); setConfirmPass('')
    setPassMsg('success:Senha alterada com sucesso!')
    setTimeout(() => setPassMsg(''), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const msgType = (msg) => msg.startsWith('error:') ? 'error' : 'success'
  const msgText = (msg) => msg.replace(/^(error|success):/, '')

  return (
    <div className="account">
      <div className="account__container">
        <div className="account__sidebar">
          <div className="account__avatar-wrap">
            <div className="account__avatar">👤</div>
            <div>
              <h2 className="account__name">{user?.name}</h2>
              <p className="account__email">{user?.email}</p>
            </div>
          </div>

          <nav className="account__nav">
            <button className="account__nav-item account__nav-item--active">Perfil</button>
            <Link to="/orders" className="account__nav-item">Meus Pedidos</Link>
            <button className="account__nav-item account__nav-item--danger" onClick={handleLogout}>Sair</button>
          </nav>
        </div>

        <div className="account__main">
          <h1 className="account__title">Perfil</h1>

          <form className="account__form" onSubmit={handleProfileSave}>
            <div className="account__row">
              <div className="account__field">
                <label className="account__label" htmlFor="first-name">Nome</label>
                <input
                  id="first-name"
                  className="account__input"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="account__field">
                <label className="account__label" htmlFor="last-name">Sobrenome</label>
                <input
                  id="last-name"
                  className="account__input"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="account__field">
              <label className="account__label" htmlFor="email">E-mail</label>
              <input
                id="email"
                className="account__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="account__field">
              <label className="account__label" htmlFor="phone">Telefone</label>
              <input
                id="phone"
                className="account__input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="account__field">
              <label className="account__label" htmlFor="address">Endereço Principal</label>
              <input
                id="address"
                className="account__input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Digite seu endereço..."
              />
            </div>

            {profileMsg && (
              <p className={`account__msg account__msg--${msgType(profileMsg)}`}>{msgText(profileMsg)}</p>
            )}

            <button type="submit" className="account__save">Salvar Alterações</button>
          </form>

          <hr className="account__divider" />

          <div className="account__section">
            <h2 className="account__section-title">Alterar Senha</h2>
            <form className="account__form" onSubmit={handlePasswordChange}>
              <div className="account__field">
                <label className="account__label" htmlFor="current-pass">Senha Atual</label>
                <input
                  id="current-pass"
                  className="account__input"
                  type="password"
                  placeholder="••••••••"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                />
              </div>
              <div className="account__row">
                <div className="account__field">
                  <label className="account__label" htmlFor="new-pass">Nova Senha</label>
                  <input
                    id="new-pass"
                    className="account__input"
                    type="password"
                    placeholder="Mín. 8 caracteres"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>
                <div className="account__field">
                  <label className="account__label" htmlFor="confirm-pass">Confirmar Senha</label>
                  <input
                    id="confirm-pass"
                    className="account__input"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
              </div>

              {passMsg && (
                <p className={`account__msg account__msg--${msgType(passMsg)}`}>{msgText(passMsg)}</p>
              )}

              <button type="submit" className="account__save">Atualizar Senha</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
