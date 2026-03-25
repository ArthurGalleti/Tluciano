import { createContext, useContext, useState } from 'react'

const OrdersContext = createContext(null)

const ORDERS_KEY = 'sd_orders'

function loadOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? [] } catch { return [] }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  const placeOrder = ({ restaurantName, restaurantImage, items, totalPrice }) => {
    const now = new Date()
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    const newOrder = {
      id: `#SW-${Date.now().toString().slice(-4)}`,
      restaurant: restaurantName,
      image: restaurantImage,
      items: items.map((i) => `${i.product.name}${i.quantity > 1 ? ` x${i.quantity}` : ''}`),
      total: `R$ ${totalPrice.toFixed(2)}`,
      date: dateStr,
      status: 'a caminho',
    }
    const updated = [newOrder, ...loadOrders()]
    setOrders(updated)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
    return newOrder
  }

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider')
  return ctx
}
