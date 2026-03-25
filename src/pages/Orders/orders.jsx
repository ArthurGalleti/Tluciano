import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../../contexts/OrdersContext'
import './orders.css'

const statusConfig = {
  entregue: { label: 'Entregue', color: '#16a34a', bg: '#dcfce7' },
  cancelado: { label: 'Cancelado', color: '#dc2626', bg: '#fee2e2' },
  'a caminho': { label: 'A Caminho', color: '#d97706', bg: '#fef3c7' },
  preparando: { label: 'Preparando', color: '#7c3aed', bg: '#ede9fe' },
}

const tabToStatus = {
  'Todos': null,
  'A Caminho': 'a caminho',
  'Entregue': 'entregue',
  'Cancelado': 'cancelado',
}

const tabs = ['Todos', 'A Caminho', 'Entregue', 'Cancelado']

function Orders() {
  const { orders } = useOrders()
  const [activeTab, setActiveTab] = useState('Todos')

  const filtered = orders.filter((o) => {
    if (activeTab === 'Todos') return true
    return o.status === tabToStatus[activeTab]
  })

  return (
    <div className="orders">
      <div className="orders__container">
        <h1 className="orders__title">Meus Pedidos</h1>

        <div className="orders__tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`orders__tab ${activeTab === tab ? 'orders__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="orders__empty">
            <span>📦</span>
            <p>Nenhum pedido encontrado.</p>
            <Link to="/home" className="orders__browse-btn">Ver Restaurantes</Link>
          </div>
        ) : (
          <div className="orders__list">
            {filtered.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.entregue
              return (
                <div key={order.id} className="orders__card">
                  <div className="orders__card-left">
                    <div className="orders__restaurant-icon">
                      {order.image
                        ? <img src={order.image} alt={order.restaurant} className="orders__restaurant-img" />
                        : <span>🍬</span>
                      }
                    </div>
                    <div className="orders__info">
                      <div className="orders__info-top">
                        <h3 className="orders__restaurant-name">{order.restaurant}</h3>
                        <span
                          className="orders__status"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="orders__items">{order.items.join(', ')}</p>
                      <p className="orders__meta">{order.id} · {order.date}</p>
                    </div>
                  </div>
                  <div className="orders__card-right">
                    <span className="orders__total">{order.total}</span>
                    <Link to="/home" className="orders__reorder">Pedir Novamente</Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
