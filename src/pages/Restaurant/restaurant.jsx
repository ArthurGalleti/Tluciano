import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { getRestaurantById } from '../../data/restaurants'
import './restaurant.css'

function Restaurant() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const restaurant = getRestaurantById(id)

  const [activeSection, setActiveSection] = useState(() => restaurant?.menu?.[0]?.label ?? '')
  const [addedKeys, setAddedKeys] = useState({})

  if (!restaurant) {
    return (
      <div className="restaurant-404">
        <span>🍽️</span>
        <h2>Restaurante não encontrado</h2>
        <p>Este estabelecimento não existe ou pode ter encerrado.</p>
        <button onClick={() => navigate('/home')}>Ver restaurantes</button>
      </div>
    )
  }

  const handleQuickAdd = (e, item) => {
    e.preventDefault()
    addItem({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name }, 1)
    setAddedKeys((prev) => ({ ...prev, [item.id]: true }))
    setTimeout(() => setAddedKeys((prev) => ({ ...prev, [item.id]: false })), 1200)
  }

  const accentRgb = hexToRgb(restaurant.accent)

  return (
    <div className="restaurant" style={{ '--accent': restaurant.accent, '--accent-light': restaurant.accentLight, '--accent-rgb': accentRgb }}>
      <div className="restaurant__hero" style={{ background: restaurant.gradient }}>
        <div className="restaurant__hero-inner">
          <div className="restaurant__hero-cover">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant__hero-img"
            />
          </div>
          <div className="restaurant__hero-info">
            <div className="restaurant__tags">
              {restaurant.tags.map((t) => (
                <span key={t} className="restaurant__tag">{t}</span>
              ))}
            </div>
            <h1 className="restaurant__name">{restaurant.name}</h1>
            <p className="restaurant__category">{restaurant.category}</p>
            <p className="restaurant__description">{restaurant.description}</p>
            <div className="restaurant__stats">
              <div className="restaurant__stat">
                <span className="restaurant__stat-icon">⭐</span>
                <div>
                  <span className="restaurant__stat-value">{restaurant.rating}</span>
                  <span className="restaurant__stat-label">{restaurant.reviews} avaliações</span>
                </div>
              </div>
              <div className="restaurant__stat">
                <span className="restaurant__stat-icon">🕐</span>
                <div>
                  <span className="restaurant__stat-value">{restaurant.time}</span>
                  <span className="restaurant__stat-label">Tempo de entrega</span>
                </div>
              </div>
              <div className="restaurant__stat">
                <span className="restaurant__stat-icon">🛵</span>
                <div>
                  <span className="restaurant__stat-value" style={{ color: restaurant.deliveryFee === 'Grátis' ? '#16a34a' : 'inherit' }}>
                    {restaurant.deliveryFee === 'Grátis' ? 'Entrega grátis' : restaurant.deliveryFee + ' entrega'}
                  </span>
                  <span className="restaurant__stat-label">Mín. R$ {restaurant.minOrder}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="restaurant__body">
        <nav className="restaurant__menu-nav">
          {restaurant.menu.map((cat) => (
            <a
              key={cat.label}
              href={`#${cat.label}`}
              className={`restaurant__menu-tab ${activeSection === cat.label ? 'restaurant__menu-tab--active' : ''}`}
              onClick={() => setActiveSection(cat.label)}
            >
              {cat.label}
              <span className="restaurant__menu-tab-count">{cat.items.length}</span>
            </a>
          ))}
        </nav>

        <div className="restaurant__menu">
          {restaurant.menu.map((cat) => (
            <section key={cat.label} id={cat.label} className="restaurant__section">
              <h2 className="restaurant__section-title">{cat.label}</h2>
              <div className="restaurant__items">
                {cat.items.map((item) => (
                  <Link to={`/product/${item.id}`} key={item.id} className="restaurant__item">
                    <div className="restaurant__item-cover">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="restaurant__item-img"
                      />
                      <button
                        className={`restaurant__item-add ${addedKeys[item.id] ? 'restaurant__item-add--added' : ''}`}
                        onClick={(e) => handleQuickAdd(e, item)}
                        aria-label={`Adicionar ${item.name} ao carrinho`}
                      >
                        {addedKeys[item.id] ? '✓' : '+'}
                      </button>
                    </div>
                    <div className="restaurant__item-info">
                      <div className="restaurant__item-top">
                        <h3 className="restaurant__item-name">{item.name}</h3>
                        {item.tags?.[0] && (
                          <span className="restaurant__item-tag">{item.tags[0]}</span>
                        )}
                      </div>
                      <p className="restaurant__item-desc">{item.description}</p>
                      <div className="restaurant__item-footer">
                        <span className="restaurant__item-price">R$ {item.price.toFixed(2)}</span>
                        {item.rating && (
                          <span className="restaurant__item-rating">⭐ {item.rating} ({item.reviews})</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

export default Restaurant
