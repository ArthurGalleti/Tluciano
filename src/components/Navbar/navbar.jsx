import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import './navbar.css'

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLink = ({ isActive }) =>
    isActive ? 'navbar__link navbar__link--active' : 'navbar__link'

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const firstName = user?.name?.split(' ')[0]

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
           SweetDrop
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <NavLink to="/home" className={navLink} onClick={() => setMenuOpen(false)}>Início</NavLink>
          <NavLink to="/restaurant/1" className={navLink} onClick={() => setMenuOpen(false)}>Restaurantes</NavLink>
          <NavLink to="/orders" className={navLink} onClick={() => setMenuOpen(false)}>Pedidos</NavLink>
          <div className="navbar__mobile-auth">
            {user ? (
              <>
                <NavLink to="/account" className="navbar__btn navbar__btn--ghost" onClick={() => setMenuOpen(false)}>
                  {firstName}
                </NavLink>
                <button className="navbar__btn navbar__btn--ghost" onClick={handleLogout}>Sair</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="navbar__btn navbar__btn--ghost" onClick={() => setMenuOpen(false)}>Entrar</NavLink>
                <NavLink to="/register" className="navbar__btn navbar__btn--primary" onClick={() => setMenuOpen(false)}>Cadastrar</NavLink>
              </>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          {user ? (
            <>
              <NavLink to="/account" className="navbar__btn navbar__btn--ghost navbar__btn--desktop">
                👤 {firstName}
              </NavLink>
              <button className="navbar__btn navbar__btn--ghost navbar__btn--desktop" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navbar__btn navbar__btn--ghost navbar__btn--desktop">Entrar</NavLink>
              <NavLink to="/register" className="navbar__btn navbar__btn--primary navbar__btn--desktop">Cadastrar</NavLink>
            </>
          )}

          <button
            className="navbar__cart-btn"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir carrinho"
          >
            🛒
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
          </button>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && <div className="navbar__backdrop" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}

export { Navbar }
