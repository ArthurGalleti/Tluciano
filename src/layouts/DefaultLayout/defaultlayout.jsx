import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Cart } from '../../components/Cart'
import { AuthProvider } from '../../contexts/AuthContext'
import { OrdersProvider } from '../../contexts/OrdersContext'
import { CartProvider } from '../../contexts/CartContext'
import './defaultlayout.css'

const DefaultLayout = () => {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          <div className="layout">
            <Navbar />
            <main className="layout__main">
              <Outlet />
            </main>
            <Footer />
            <Cart />
          </div>
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  )
}

export { DefaultLayout }
