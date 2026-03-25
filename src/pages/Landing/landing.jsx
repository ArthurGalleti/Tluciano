import { Link } from 'react-router-dom'
import './landing.css'

const features = [
  { icon: '🚀', title: 'Entrega Rápida', description: 'Seus pedidos chegam em até 40 min, frescos e saborosos.' },
  { icon: '🍰', title: 'Grande Variedade', description: 'Centenas de sobremesas, bolos e doces para escolher.' },
  { icon: '💳', title: 'Pagamento Fácil', description: 'Múltiplas formas de pagamento, checkout rápido e seguro.' },
  { icon: '⭐', title: 'Mais Bem Avaliados', description: 'Apenas os melhores restaurantes, selecionados pela nossa comunidade.' },
]

function Landing() {
  return (
    <div className="landing">
      <section className="landing__hero">
        <div className="landing__hero-content">
          <span className="landing__badge">🍬 Doces favoritos, entregues</span>
          <h1 className="landing__title">
            Com vontade de algo <span className="landing__title-accent">doce?</span>
          </h1>
          <p className="landing__subtitle">
            Peça das melhores confeitarias e entregamos na sua porta. Rápido, fácil e delicioso.
          </p>
          <div className="landing__cta">
            <Link to="/home" className="landing__btn landing__btn--primary">Pedir Agora</Link>
            <Link to="/register" className="landing__btn landing__btn--ghost">Criar Conta</Link>
          </div>
        </div>
        <div className="landing__hero-visual">
          <img
            src="https://images.unsplash.com/photo-1654736092502-e3e45d741469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9udXRzJTIwY29sb3JpZG9zfGVufDB8fDB8fHww"
            alt="Donuts coloridos"
            className="landing__hero-img"
          />
        </div>
      </section>

      <section className="landing__features">
        <h2 className="landing__section-title">Por que SweetDrop?</h2>
        <div className="landing__features-grid">
          {features.map((f) => (
            <div key={f.title} className="landing__feature-card">
              <span className="landing__feature-icon">{f.icon}</span>
              <h3 className="landing__feature-title">{f.title}</h3>
              <p className="landing__feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__banner">
        <h2 className="landing__banner-title">Pronto para satisfazer sua vontade?</h2>
        <p className="landing__banner-sub">Junte-se a milhares de clientes satisfeitos.</p>
        <Link to="/register" className="landing__btn landing__btn--white">Comece Agora — É Grátis</Link>
      </section>
    </div>
  )
}

export default Landing
