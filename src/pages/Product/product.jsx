import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { getProductById, getRestaurantById } from '../../data/restaurants'
import './product.css'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = getProductById(id)
  const restaurant = product ? getRestaurantById(product.restaurantId) : null

  const [selectedOption, setSelectedOption] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="product-404">
        <span>🍽️</span>
        <h2>Produto não encontrado</h2>
        <p>Este item não existe ou pode não estar mais disponível.</p>
        <button onClick={() => navigate('/home')}>Ver restaurantes</button>
      </div>
    )
  }

  const hasOptions = product.options && product.options.length > 0
  const currentOption = hasOptions ? product.options[selectedOption] : null
  const total = ((product.price + (currentOption?.extra ?? 0)) * quantity).toFixed(2)

  const handleAddToCart = () => {
    addItem(
      { ...product, restaurantId: restaurant?.id, restaurantName: restaurant?.name },
      quantity,
      currentOption
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const accent = restaurant?.accent ?? '#e9557f'
  const accentLight = restaurant?.accentLight ?? '#fce7f0'

  return (
    <div
      className="product"
      style={{ '--accent': accent, '--accent-light': accentLight }}
    >
      <div className="product__container">
        <Link to={`/restaurant/${restaurant?.id ?? ''}`} className="product__back">
          ← {restaurant?.name ?? 'Voltar'}
        </Link>

        <div className="product__layout">
          <div className="product__cover">
            <img
              src={product.image}
              alt={product.name}
              className="product__img"
            />
          </div>

          <div className="product__details">
            <div className="product__tags">
              {product.tags?.map((tag) => (
                <span key={tag} className="product__tag">{tag}</span>
              ))}
            </div>

            <h1 className="product__name">{product.name}</h1>

            <div className="product__meta">
              <span className="product__rating">⭐ {product.rating}</span>
              <span className="product__meta-dot">·</span>
              <span className="product__review-count">{product.reviews} avaliações</span>
              {restaurant && (
                <>
                  <span className="product__meta-dot">·</span>
                  <span>{restaurant.time}</span>
                </>
              )}
            </div>

            <p className="product__description">{product.description}</p>

            {hasOptions && (
              <div className="product__section">
                <h3 className="product__section-title">Tamanho</h3>
                <div className="product__options">
                  {product.options.map((opt, i) => (
                    <button
                      key={opt.label}
                      className={`product__option ${selectedOption === i ? 'product__option--active' : ''}`}
                      onClick={() => setSelectedOption(i)}
                    >
                      <span>{opt.label}</span>
                      {opt.extra > 0 && <span className="product__option-extra">+R$ {opt.extra.toFixed(2)}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product__section">
              <h3 className="product__section-title">Quantidade</h3>
              <div className="product__quantity">
                <button
                  className="product__qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >−</button>
                <span className="product__qty-value">{quantity}</span>
                <button
                  className="product__qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >+</button>
              </div>
            </div>

            <div className="product__footer">
              <div className="product__price-total">
                <span className="product__price-label">Total</span>
                <span className="product__price-value">R$ {total}</span>
              </div>
              <button
                className={`product__add-btn ${added ? 'product__add-btn--added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Adicionado!' : 'Adicionar ao Carrinho 🛒'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
