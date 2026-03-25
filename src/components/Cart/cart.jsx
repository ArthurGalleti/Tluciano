import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { useOrders } from '../../contexts/OrdersContext'
import { restaurants } from '../../data/restaurants'
import './cart.css'

const Cart = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const { user } = useAuth()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      setIsOpen(false)
      navigate('/login', { state: { from: '/orders' } })
      return
    }

    const firstItem = items[0]
    const restaurantId = firstItem?.product?.restaurantId
    const restaurant = restaurants.find((r) => r.id === restaurantId)

    placeOrder({
      restaurantName: restaurant?.name ?? 'SweetDrop',
      restaurantImage: restaurant?.image ?? null,
      items,
      totalPrice,
    })

    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      clearCart()
      setIsOpen(false)
      navigate('/orders')
    }, 1800)
  }

  return (
    <>
      {isOpen && <div className="cart__overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`cart ${isOpen ? 'cart--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">Seu Carrinho</h2>
          {totalItems > 0 && (
            <span className="cart__count">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
          )}
          <button className="cart__close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {success ? (
          <div className="cart__success">
            <span className="cart__success-icon">✅</span>
            <p className="cart__success-title">Pedido realizado!</p>
            <p className="cart__success-sub">Redirecionando para seus pedidos…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="cart__empty">
            <span className="cart__empty-icon">🛒</span>
            <p>Seu carrinho está vazio</p>
            <span className="cart__empty-sub">Adicione algumas delícias!</span>
          </div>
        ) : (
          <>
            <ul className="cart__items">
              {items.map((item) => (
                <li key={item.key} className="cart__item">
                  <div className="cart__item-cover">
                    {item.product.image
                      ? <img src={item.product.image} alt={item.product.name} className="cart__item-img" />
                      : <span>{item.product.emoji}</span>
                    }
                  </div>
                  <div className="cart__item-info">
                    <p className="cart__item-name">{item.product.name}</p>
                    {item.option && (
                      <p className="cart__item-option">{item.option.label}</p>
                    )}
                    <p className="cart__item-price">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart__item-controls">
                    <button
                      className="cart__qty-btn"
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    >−</button>
                    <span className="cart__qty">{item.quantity}</span>
                    <button
                      className="cart__qty-btn"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button className="cart__remove" onClick={() => removeItem(item.key)}>✕</button>
                </li>
              ))}
            </ul>

            <div className="cart__footer">
              <div className="cart__summary">
                <div className="cart__summary-row">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart__summary-row">
                  <span>Entrega</span>
                  <span className="cart__summary-free">Grátis</span>
                </div>
                <div className="cart__summary-row cart__summary-row--total">
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button className="cart__checkout" onClick={handleCheckout}>
                {user ? `Finalizar · R$ ${totalPrice.toFixed(2)}` : 'Entrar para finalizar'}
              </button>
              <button className="cart__clear" onClick={clearCart}>Limpar carrinho</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export { Cart }
