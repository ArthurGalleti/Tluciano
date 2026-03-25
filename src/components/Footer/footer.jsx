import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">🍬 SweetDrop</Link>
          <p className="footer__tagline">Doces deliciosos, entregues rápido.</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Explorar</h4>
          <Link to="/home" className="footer__link">Início</Link>
          <Link to="/restaurant/1" className="footer__link">Restaurantes</Link>
          <Link to="/product/1" className="footer__link">Produtos</Link>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Conta</h4>
          <Link to="/login" className="footer__link">Entrar</Link>
          <Link to="/register" className="footer__link">Cadastrar</Link>
          <Link to="/account" className="footer__link">Minha Conta</Link>
          <Link to="/orders" className="footer__link">Meus Pedidos</Link>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} SweetDrop. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export { Footer }
