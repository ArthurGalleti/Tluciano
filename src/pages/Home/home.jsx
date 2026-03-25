import { useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurants } from '../../data/restaurants'
import './home.css'

const categories = [
  { icon: '🍰', label: 'Bolos' },
  { icon: '🍩', label: 'Donuts' },
  { icon: '🍦', label: 'Sorvetes' },
  { icon: '🧁', label: 'Cupcakes' },
  { icon: '🍫', label: 'Chocolate' },
  { icon: '🥐', label: 'Padaria' },
]

function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const filtered = restaurants.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      !activeCategory || r.category.toLowerCase().includes(activeCategory.toLowerCase())
    return matchSearch && matchCategory
  })

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__header-content">
          <h1 className="home__title">O que você está com vontade?</h1>
          <p className="home__subtitle">Descubra os melhores doces perto de você</p>
          <div className="home__search-bar">
            <span className="home__search-icon">🔍</span>
            <input
              className="home__search-input"
              type="text"
              placeholder="Buscar restaurantes ou pratos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="home__search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="home__content">
        <section>
          <h2 className="home__section-title">Categorias</h2>
          <div className="home__categories-list">
            {categories.map((c) => (
              <button
                key={c.label}
                className={`home__category-chip ${activeCategory === c.label ? 'home__category-chip--active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="home__section-title">
            {activeCategory ? activeCategory : 'Todos os Restaurantes'}
            <span className="home__count">{filtered.length} lugares</span>
          </h2>

          {filtered.length === 0 ? (
            <div className="home__empty">
              <span>😕</span>
              <p>Nenhum restaurante encontrado.</p>
              <button className="home__empty-reset" onClick={() => { setSearch(''); setActiveCategory(null) }}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="home__restaurants-grid">
              {filtered.map((r) => (
                <Link to={`/restaurant/${r.id}`} key={r.id} className="home__restaurant-card">
                  <div className="home__restaurant-cover">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="home__restaurant-img"
                    />
                    {r.tags?.[0] && (
                      <span
                        className="home__restaurant-badge"
                        style={{ background: r.accent }}
                      >
                        {r.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="home__restaurant-info">
                    <div className="home__restaurant-header">
                      <h3 className="home__restaurant-name">{r.name}</h3>
                      <span className="home__restaurant-rating">⭐ {r.rating}</span>
                    </div>
                    <p className="home__restaurant-category">{r.category}</p>
                    <div className="home__restaurant-meta">
                      <span>🕐 {r.time}</span>
                      <span className="home__restaurant-dot">·</span>
                      <span style={{ color: r.deliveryFee === 'Grátis' ? '#16a34a' : '#6b7280', fontWeight: r.deliveryFee === 'Grátis' ? 600 : 400 }}>
                        {r.deliveryFee === 'Grátis' ? '🛵 Frete grátis' : `🛵 ${r.deliveryFee}`}
                      </span>
                    </div>
                  </div>
                  <div
                    className="home__restaurant-cta"
                    style={{ borderColor: r.accentLight, color: r.accent }}
                  >
                    Ver Cardápio →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
